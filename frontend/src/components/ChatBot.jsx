import { useState } from "react"

import { FaRobot, FaTimes } from "react-icons/fa"

import { motion, AnimatePresence } from "framer-motion"

import API from "../services/api"

function ChatBot({ open, setOpen }) {

  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to Wular AI 🌄  Explore Kashmir’s beauty, traditional arts, local shops, and tourism spots.  Tell me your plan and I’ll guide your journey."
    }
  ])

  const [loading, setLoading] = useState(false)

  // Send Message Function
 const sendMessage = async () => {

  if (!message.trim()) return

  const userMessage = {
    sender: "user",
    text: message
  }

  setMessages((prev) => [
    ...prev,
    userMessage
  ])

  const currentMessage = message

  setMessage("")

  setLoading(true)

  try {

    const res = await API.post(
      "/chat",
      {
        message: currentMessage
      }
    )

    console.log(res.data)

    const botMessage = {

      sender: "bot",

      text:
        res.data.reply ||
        "No response from AI"
    }

    setMessages((prev) => [
      ...prev,
      botMessage
    ])

  } catch (error) {

    console.log(error)

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "AI server error."
      }
    ])

  } finally {

    setLoading(false)
  }
}

  // Enter Key Support
  const handleKeyPress = (e) => {

    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (

    <>

      {/* Floating Button */}

      <motion.button

        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}

        onClick={() => setOpen(!open)}

        className="
        fixed bottom-6 right-6
        bg-cyan-500
        text-white
        p-5 rounded-full
        shadow-2xl z-50
        text-3xl
        hover:bg-cyan-400
        transition
        "
      >

        <FaRobot />

      </motion.button>

      {/* Chat Window */}

      <AnimatePresence>

        {open && (

          <motion.div

            initial={{
              opacity: 0,
              y: 100,
              scale: 0.9
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            exit={{
              opacity: 0,
              y: 100,
              scale: 0.9
            }}

            transition={{
              duration: 0.3
            }}

            className="
            fixed bottom-24 right-6
            w-[420px]
            h-[650px]
            bg-black/40
            backdrop-blur-2xl
            border border-white/10
            rounded-3xl
            shadow-[0_0_40px_rgba(0,255,255,0.3)]
            overflow-hidden
            z-50
            text-white
            flex flex-col
            "
          >

            {/* Header */}

            <div className="
            p-5 border-b border-white/10
            flex items-center justify-between
            bg-white/5
            ">

              <div className="
              flex items-center gap-4
              ">

                <div className="
                w-14 h-14 rounded-full
                bg-cyan-500
                flex items-center justify-center
                text-2xl shadow-lg
                ">

                  <FaRobot />

                </div>

                <div>

                  <h1 className="
                  text-2xl font-bold
                  ">
                    Wular AI
                  </h1>

                  <p className="
                  text-sm text-green-400
                  ">
                    AI Assistant
                  </p>

                </div>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="
                text-xl hover:text-red-400
                transition
                "
              >

                <FaTimes />

              </button>

            </div>

            {/* Messages */}

            <div className="
            flex-1
            overflow-y-auto
            p-5
            space-y-4
            ">

              {messages.map((msg, index) => (

                <div
                  key={index}

                  className={`
                  p-4 rounded-2xl max-w-[85%]

                  ${msg.sender === "user"
                    ? "bg-cyan-500 ml-auto"
                    : "bg-white/10 border border-white/10"
                  }
                  `}
                >

                  {msg.text}

                </div>

              ))}

              {/* Loading */}

              {loading && (

                <div className="
                bg-white/10
                p-4 rounded-2xl
                max-w-[85%]
                border border-white/10
                ">

                  AI is thinking...

                </div>
              )}

            </div>

            {/* Input Area */}

            <div className="
            p-4 border-t border-white/10
            bg-white/5
            ">

              <div className="
              flex items-center gap-3
              ">

                <input
                  type="text"

                  value={message}

                  onChange={(e) =>
                    setMessage(e.target.value)
                  }

                  onKeyDown={handleKeyPress}

                  placeholder="Ask about Kashmir..."

                  className="
                  flex-1
                  bg-white/10
                  border border-white/10
                  rounded-2xl
                  px-5 py-4
                  outline-none
                  text-white
                  placeholder:text-gray-400
                  focus:border-cyan-400
                  "
                />

                <button

                  onClick={sendMessage}

                  className="
                  bg-cyan-500
                  hover:bg-cyan-400
                  px-6 py-4
                  rounded-2xl
                  font-bold
                  transition
                  shadow-lg
                  "
                >

                  Send

                </button>

              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </>
  )
}

export default ChatBot