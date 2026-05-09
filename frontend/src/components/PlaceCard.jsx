import { motion } from "framer-motion"

function PlaceCard({ place }) {

  return (

    <motion.div

      whileHover={{
        scale: 1.05
      }}

      className="
      bg-white/10
      backdrop-blur-lg
      border border-white/20
      rounded-3xl
      overflow-hidden
      shadow-2xl
      text-white
      "

    >

      <img
        src={place.image}
        alt={place.name}
        className="h-72 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-3xl font-bold">
          {place.name}
        </h2>

        <p className="mt-3 text-gray-300">
          {place.description}
        </p>

        <div className="mt-4 flex justify-between">

          <span className="bg-cyan-500 px-4 py-2 rounded-full">
            {place.category}
          </span>

          <span>
            {place.bestSeason}
          </span>

        </div>

      </div>

    </motion.div>
  )
}

export default PlaceCard