import React, { useEffect } from "react";

function GamesByGenresId({ gameList }) {
  useEffect(() => {
    console.log("check game list by id id id", gameList);
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[40px]">{gameList[0].genres[0].name}</h2>
      <div className="grid grid-cols-4 gap-4 h-full">
        {gameList.length > 0
          ? gameList.map((game, index) => {
              return (
                <div className="p-3 rounded-lg flex flex-col bg-red-900 hover:scale-105 cursor-pointer duration-500" key={index}>
                <img src={game.background_image} alt="img" className="h-[80%] object-cover" />
                <div className="flex flex-col gap-4">
                    <h4 className="mt-2 text-[20px] text-bold">{game.name} <span className="p-1 bg-green-400">{game.metacritic}</span> </h4>
                    <p>⭐{game.rating}  🎯{game.reviews_count} 🔥{game.suggestions_count}</p>
                </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default GamesByGenresId;
