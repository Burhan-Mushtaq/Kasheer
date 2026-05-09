import { motion } from "framer-motion"

function ShopCard({ shop }) {

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
        src={shop.image}
        alt={shop.name}
        className="
        h-72 w-full object-cover
        "
      />

      <div className="p-5">

        <h2 className="
        text-3xl font-bold
        ">
          {shop.name}
        </h2>

        <p className="
        mt-3 text-gray-300
        ">
          {shop.description}
        </p>

        <div className="
        mt-4 flex justify-between items-center
        ">

          <span className="
          bg-cyan-500
          px-4 py-2 rounded-full
          ">
            {shop.category}
          </span>

          <span className="text-gray-300">
            {shop.location}
          </span>

        </div>

      </div>

    </motion.div>
  )
}

export default ShopCard