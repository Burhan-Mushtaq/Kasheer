from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

from langchain_core.callbacks import StreamingStdOutCallbackHandler
from langchain_core.prompts import ChatPromptTemplate

from langchain_community.chat_message_histories import ChatMessageHistory

from pydantic import BaseModel

import os

# Load ENV Variables
load_dotenv()

# FastAPI App
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# Request Model
class ChatRequest(BaseModel):
    message: str

# Chat Memory
chat_history = ChatMessageHistory()

# Greeting State
greeted = False

# Base Directory
BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

# Chroma DB Path
CHROMA_PATH = os.path.join(
    BASE_DIR,
    "chroma_db"
)

# Embedding Model
embedding_model = HuggingFaceEmbeddings(

    model_name="BAAI/bge-small-en-v1.5",

    model_kwargs={
        "device": "cpu"
    },

    encode_kwargs={
        "normalize_embeddings": True
    }
)

# Load Vector Database
vectorstore = Chroma(

    persist_directory=CHROMA_PATH,

    embedding_function=embedding_model
)

# Retriever
retriever = vectorstore.as_retriever(

    search_type="similarity",

    search_kwargs={
        "k": 12
    }
)

# LLM
llm = ChatGroq(

    model="llama-3.1-8b-instant",

    temperature=0.3,

    streaming=False,

    callbacks=[
        StreamingStdOutCallbackHandler()
    ]
)

# Prompt Template
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",

            """
You are Wular AI, an intelligent Kashmir tourism assistant.

You help tourists with:
- Kashmir tourism places
- Snow destinations
- Hotels
- Travel agencies
- Kashmiri handicrafts
- Local shops
- Food
- Adventure tourism

GREETING RULE:
- If user says hi, hello, salam, or greetings,
  respond ONLY ONCE with:

"Welcome to Wular AI! I am your personal Kashmir travel guide.
Where are you traveling from, and how many days are you planning to stay in Kashmir?"

STRICT RULES:
- Answer ONLY using the retrieved context
- NEVER use outside knowledge
- NEVER make up information
- If answer is unavailable say:
  "I don't have that information"

- Keep answers natural and helpful
- Mention exact place names
- Recommend only places/agencies found in context
"""
        ),

        (
            "human",

            """
Use the following Kashmir tourism information
to answer the user's question.

Conversation History:
{history}

Retrieved Context:
{context}

User Question:
{question}

Answer:
"""
        )
    ]
)

print("✅ Wular AI Running")

# Home Route
@app.get("/")
async def home():

    return {
        "message": "Wular AI API Running"
    }

# Health Route
@app.get("/health")
async def health():

    return {
        "status": "healthy"
    }

# Chat Route
@app.post("/chat")
async def chat(data: ChatRequest):

    global greeted

    try:

        query = data.message.strip()

        if not query:

            return {
                "success": False,
                "error": "Empty message"
            }

        print("\n========================")
        print("USER QUERY:")
        print(query)
        print("========================")

        # Retrieve Documents
        docs = retriever.invoke(query)

        print("\nRETRIEVED DOCUMENTS:\n")

        # Better Context Formatting
        context = ""

        for i, doc in enumerate(docs):

            print(f"\nDOCUMENT {i+1}")
            print(doc.page_content)
            print("---------------------")

            context += f"""

Document {i+1}:

{doc.page_content}

"""

        # Chat History
        history = "\n".join(

            [
                f"User: {msg.content}"
                if msg.type == "human"
                else f"AI: {msg.content}"

                for msg in chat_history.messages
            ]
        )

        # Greeting Control
        if not greeted:

            modified_query = query

        else:

            modified_query = f"""

IMPORTANT:
You have already greeted the user before.
DO NOT greet again.

User Question:
{query}
"""

        # Final Prompt
        final_prompt = prompt.invoke({

            "history": history,

            "context": context,

            "question": modified_query
        })

        print("\nGENERATING RESPONSE...\n")

        # AI Response
        response = llm.invoke(
            final_prompt.to_messages()
        )

        print("\nAI RESPONSE:")
        print(response.content)

        # Greeting Completed
        greeted = True

        # Save Chat Memory
        chat_history.add_user_message(query)

        chat_history.add_ai_message(
            response.content
        )

        # Sources
        sources = []

        for doc in docs:

            source = doc.metadata.get("source")

            if source and source not in sources:

                sources.append(source)

        return {

            "success": True,

            "reply": response.content,

            "sources": sources
        }

    except Exception as e:

        print("\nERROR:")
        print(str(e))

        return {

            "success": False,

            "error": str(e)
        }

port = int(os.environ.get("PORT", 10000))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=port)
