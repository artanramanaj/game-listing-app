import React, { useEffect } from 'react'

function TrendingGamesCart({gameListing}) {
    useEffect(()=> {
        console.log("check the trending game cart component", gameListing)
    }, [])
  return (
    <div className='grid grid-cols-4 gap-4 md:h-[400px] '>
            {gameListing.slice(0,4).map((game, index) => (
                <div key={index} className=" rounded-lg flex flex-col bg-red-900 hover:scale-110 cursor-pointer duration-500">
                    <img src={game.background_image} alt={game.name} className="w-full h-full  object-cover rounded-lg" />
                    <h2 className="text-lg font-semibold mt-2 p-4">{game.name}</h2>
                </div>
            ))}
        </div>
  )
}

export default TrendingGamesCart