import React, { useEffect, useState } from "react";
import Genres from "../Components/Genres";
import { axiosInstance, key } from "./../Services/GlobalApi.jsx";
import Banner from "../Components/Banner.jsx";
import TrendingGames from "../Components/TrendingGames.jsx";
import GamesByGenresId from "../Components/GamesByGenresId.jsx";

function Home() {
  const [allGameList, setAllGameList] = useState([]);
  const [gameListByGenres, setGameListByGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(4); 
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 5
  useEffect(() => {
    getAllGamesList();
  }, [currentPage]);
  useEffect(() => {
    getGamesByGenreId(selectedGenreId);
    console.log("selectedGenreId", selectedGenreId)
  }, [selectedGenreId]);

  const getAllGamesList = async () => {
    try {
      const { data } = await axiosInstance.get(`/games?page=${currentPage}&page_size=${perPage}&key=${key}`);
      console.log("check the all games games games  response here", data);
      setAllGameList(data.results);
    } catch (error) {
      console.log("check game error", error);
    }
  };

  const getGamesByGenreId = async (GenreId) => {
    const { data } = await axiosInstance.get(
      `/games?key=${key}&genres=${GenreId}`
    );
    console.log("check genre games by id", data.results);
    setGameListByGenres(data.results);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenreId(genreId);
  };

  return (
    <div className="dark:text-white grid grid-cols-4 gap-4">
      <div className="col-span-1  h-full flex flex-col gap-2 ">
        <h2 className="text-[40px] mt-2">Genres</h2>
        <Genres onGenreSelect={handleGenreSelect} />
      </div>

      <div className="col-span-3  h-full flex flex-col gap-8">
        {allGameList.length > 0 ? (
          <Banner gameListing={allGameList[0]} />
        ) : null}

        {allGameList.length > 0 ? (
          <TrendingGames gameListing={allGameList} />
        ) : null}

        {gameListByGenres.length > 0 ? (
          <GamesByGenresId gameList={gameListByGenres} />
        ) : null}
      </div>
    </div>
  );
}

export default Home;
