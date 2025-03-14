import { useState, useEffect, useRef, useCallback } from 'react';
import Genres from "../Components/Genres";
import { axiosInstance, key } from "./../Services/GlobalApi.jsx";
import Banner from "../Components/Banner.jsx";
import TrendingGames from "../Components/TrendingGames.jsx";
import GamesByGenresId from "../Components/GamesByGenresId.jsx";
import Spinner from '../Components/Spinner.jsx';
import GenresModal from "../Components/GenresModal";
const useDebounce = (callback, delay) => {
  const debounceTimer = useRef(null);

  return useCallback((...args) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};
function Home({search, setShowModal, showModal}) {
  const [allGameList, setAllGameList] = useState([]);
  const [gameListByGenres, setGameListByGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(4); 
  const [currentPage, setCurrentPage] = useState(1)
  const [page, setPage] = useState(1)

  const [total, setTotal] = useState(1);
  const perPage = 8
  const [showSpinner, setShowSpinner] = useState(false)

  const getAllGamesList = async () => {
    let url; 
    if(search) {
      url = `/games?page=${currentPage}&page_size=${perPage}&search=${search}&search_precise=true&key=${key}`
    } else {
       url = `/games?page=${currentPage}&page_size=${perPage}&key=${key}`
    }
    try {
      setShowSpinner(true)
      const { data } = await axiosInstance.get(url);
      console.log("check the all games games games  response here", data);
      setAllGameList(data.results);
    } catch (error) {
      console.log("check game error", error);
    } finally {
      setShowSpinner(false)
    }
  };

  const debouncedGetAllGames = useDebounce(getAllGamesList, 1500);

  useEffect(() => {
    debouncedGetAllGames();
  }, [currentPage, search]);
  useEffect(() => {
    getGamesByGenreId(selectedGenreId);
    console.log("selectedGenreId", selectedGenreId)
  }, [selectedGenreId, page]);



  const getGamesByGenreId = async (GenreId) => {
    try {
      setShowSpinner(true);
      const { data } = await axiosInstance.get(
        `/games?key=${key}&genres=${GenreId}&page=${page}&page_size=${perPage}`
      );
      console.log("check genre games by id", data);
      setTotal(data.results.length);
      setGameListByGenres(data.results);
    } catch (error) {
      console.error("Error fetching games by genre:", error);
    } finally {
      setShowSpinner(false); 
    }
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenreId(genreId);
  };

  const handleDataFromChild = (childValue) => {
    console.log("check the current page here", childValue)
    setCurrentPage(childValue)
  }
  const dynamicCurrentPage = (childValue) => {
    console.log("check the current page here", childValue)
    setPage(childValue)
  }

  return (
    <div className="dark:text-white grid md:grid-cols-4 gap-4">
      <div className="hidden col-span-1 h-full md:flex flex-col gap-2">
        <h2 className="text-[40px] mt-2">Genres</h2>
        <Genres onGenreSelect={handleGenreSelect} />
      </div>
  
      <div className="col-span-3 h-full flex flex-col gap-8">
        {allGameList.length > 0  ? (
          <Banner gameListing={allGameList[0]} />
        ) : <Spinner/>}
  
        {allGameList.length > 0 ? (
          <TrendingGames  gameListing={allGameList} sendData={handleDataFromChild} total={total} />
        ) : <Spinner/>}
  
        {gameListByGenres.length > 0 ? (
          <GamesByGenresId  gameList={gameListByGenres} page={page} dynamicCurrentPage={dynamicCurrentPage} total={total} />
        ) : <Spinner/>}

           {showModal == true ? <GenresModal setShowModal={setShowModal} setSelectedGenreId={setSelectedGenreId} /> : null}
      </div>
    </div>
  );
}

export default Home;
