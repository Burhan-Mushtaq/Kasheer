import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import PlaceCard from "../components/PlaceCard"
import ChatBot from "../components/ChatBot"
import ShopCard from "../components/ShopCard"

import API from "../services/api"

function Home() {

  const [places, setPlaces] = useState([])

  const [shops, setShops] = useState([])

  const [chatOpen, setChatOpen] =
    useState(false)

  useEffect(() => {

  fetchPlaces()
  fetchShops()

}, [])

  const fetchPlaces = async () => {

    try {

      const res =
        await API.get("/places")

      setPlaces(res.data)

    } catch (error) {

      console.log(error)
    }
  }
  const fetchShops = async () => {

  try {

    const res =
      await API.get("/shops")

    setShops(res.data)

  } catch (error) {

    console.log(error)
  }
}
  return (

    <div className="
    min-h-screen
    bg-gradient-to-b
    from-black
    via-gray-900
    to-black
    text-white
    ">

      <Navbar
        openChat={() => setChatOpen(true)}
      />

      <div id="home">
        <Hero />
      </div>

      <section
        id="places"
        className="p-10"
      >

        <h1 className="
        text-5xl font-bold mb-10
        ">
          Popular Places
        </h1>

        <div className="
        grid md:grid-cols-3 gap-8
        ">

          {places.map((place) => (

            <PlaceCard
              key={place._id}
              place={place}
            />

          ))}

        </div>

      </section>

      <section
  id="shops"
  className="p-10"
>

  <h1 className="
  text-5xl font-bold mb-10
  ">
    Kashmiri Shops
  </h1>

  <div className="
  grid md:grid-cols-3 gap-8
  ">

    {shops.map((shop) => (

      <ShopCard
        key={shop._id}
        shop={shop}
      />

    ))}

  </div>

</section>

      <ChatBot
        open={chatOpen}
        setOpen={setChatOpen}
      />

    </div>
  )
}

export default Home