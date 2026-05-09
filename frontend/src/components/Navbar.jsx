import { motion } from "framer-motion"

function Navbar({ openChat }) {

  const scrollToSection = (id) => {

    const section =
      document.getElementById(id)

    section?.scrollIntoView({
      behavior: "smooth"
    })
  }

  return (

    <motion.nav

      initial={{ y: -100 }}
      animate={{ y: 0 }}

      className="
      fixed top-0 w-full z-50
      bg-white/10 backdrop-blur-md
      border-b border-white/20
      text-white px-10 py-5
      flex justify-between items-center
      "

    >

      <h1 className="
      text-3xl font-bold tracking-wider
      ">
        Kasheer
      </h1>

      <div className="
      flex gap-8 text-lg
      ">

        <button
          onClick={() =>
            scrollToSection("home")
          }
          className="hover:text-cyan-400 transition"
        >
          Home
        </button>

        <button
          onClick={() =>
            scrollToSection("places")
          }
          className="hover:text-cyan-400 transition"
        >
          Places
        </button>

        <button
          onClick={() =>
            scrollToSection("shops")
          }
          className="hover:text-cyan-400 transition"
        >
          Shops
        </button>

        <button
          onClick={openChat}
          className="
          bg-cyan-500 px-5 py-2 rounded-full
          hover:bg-cyan-400 transition
          "
        >
          Wular AI
        </button>

      </div>

    </motion.nav>
  )
}

export default Navbar