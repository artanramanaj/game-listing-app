import React, { useEffect } from 'react'
import TrendingGamesCart from './TrendingGames/TrendingGamesCart'

function TrendingGames({gameListing}) {
    useEffect(()=> {
        console.log("check the trending game listing ", gameListing)
    }, [])
  return (
    <div>
           <h2 className="text-[40px] mt-2">Trending Games</h2>
           <TrendingGamesCart gameListing={gameListing} />
    </div>
  )
}

export default TrendingGames