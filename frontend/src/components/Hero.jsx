import { motion } from "framer-motion"

function Hero() {

  return (

    <div
      className="relative h-screen
      bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
        "url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1400')"
      }}
    >

      <div className="absolute inset-0 bg-black/60" />

      <motion.div

        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}

        className="relative z-10 text-center text-white"
      >

        <h1 className="text-7xl font-black mb-6">
          Discover Kashmir
        </h1>

        <p className="text-2xl text-gray-300 mb-8">
          AI Powered Tourism Experience
        </p>

        <button
          className="px-8 py-4 rounded-full
          bg-cyan-500 hover:bg-cyan-400
          text-white text-xl
          shadow-2xl hover:scale-105
          transition"
        >
          Explore Now
        </button>

      </motion.div>

    </div>
  )
}

export default Hero