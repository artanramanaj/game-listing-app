import React, { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";
function GamesByGenresId({ gameList, dynamicCurrentPage, total, page}) {
 
  const nextPage = () => {
    dynamicCurrentPage((prev) => {
      return prev + 1;
    });
  };

  const prevPage = () => {
    dynamicCurrentPage((prev) => {
      return prev - 1;
    });
  };
  const goToPage = (pageNum) => {
    dynamicCurrentPage(pageNum);
  };
  return (
   
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2 ">
        <h2 className="text-[40px]">{gameList[0].genres[0].name}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
          {gameList.length > 0
            ? gameList.map((game, index) => {
                return (
                  <div
                    className="p-3 rounded-lg flex flex-col bg-red-900 hover:scale-105 cursor-pointer duration-500"
                    key={index}
                  >
                    <img
                      src={game.background_image}
                      alt="img"
                      className="h-[80%] object-cover"
                    />
                    <div className="flex flex-col gap-4">
                      <h4 className="mt-2 text-[20px] text-bold">
                        {game.name}{" "}
                        <span className="p-1 bg-green-400">
                          {game.metacritic}
                        </span>{" "}
                      </h4>
                      <p>
                        ⭐{game.rating} 🎯{game.reviews_count} 🔥
                        {game.suggestions_count}
                      </p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
        <button
          onClick={prevPage}
          className={`py-2 px-6 rounded-lg bg-red-400 ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="flex gap-2">
  {[...Array(total)].map((_, index) => {
  
    if (index === 0 || index === total - 1 || Math.abs(page - 1 - index) <= 1) {
      return (
        <button
          key={index}
          onClick={() => goToPage(index + 1)}
          className={`px-4 py-2 rounded-full dark:bg-gray-900 ${
            page === index + 1 ? "dark:bg-red-600 bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      );
    }

   
    if (
      (index === 1 && page > 3) || 
      (index === total - 2 && page < total - 2) 
    ) {
      return <span className='px-4 py-2 rounded-full dark:bg-gray-900 ' key={index}>...</span>;
    }

    return null; 
  })}
</div>
        <button
          onClick={nextPage}
          className={`py-2 px-6 rounded-lg bg-blue-600 ${
            page === total ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === total}
        >
          Next
        </button>
      </div>
    </div>

  );
}

export default GamesByGenresId;
