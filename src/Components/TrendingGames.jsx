import React, { useEffect, useState } from 'react'
import TrendingGamesCart from './TrendingGames/TrendingGamesCart'
import Spinner from "./Spinner.jsx";

function TrendingGames({gameListing , sendData , total}) {
    useEffect(()=> {
        console.log("check the trending game listing ", gameListing)
    }, [])

    const [page, setPage] = useState(1);

    const nextPage = () => {
      setPage((prev) => {
        const newPage = prev + 1;
        sendData(newPage, total); 
        return newPage;
      });
    };
    const prevPage = () => {
      setPage((prev) => {
        const newPage = prev - 1;
        sendData(newPage); 
        return newPage;
      });
    };
    const goToPage = (pageNum) => {
      setPage(pageNum);
      sendData(pageNum); 
    };
  
 
  return (

    <div className='flex flex-col gap-4 p-4'>
           <h2 className="text-[40px] mt-2">Trending Games</h2>
           <TrendingGamesCart gameListing={gameListing} />
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

   

  )
}

export default TrendingGames