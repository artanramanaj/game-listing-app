import React, { useEffect, useState } from "react";
import { axiosInstance, key } from "./../Services/GlobalApi.jsx";
import Spinner from "./Spinner.jsx";

function Genres({ onGenreSelect }) {
  const [genres, setGenres] = useState([]);
  const [findIndex, setFindIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [searchVal, setSeachVal] = useState("a");
  const [total, setTotal] = useState(1);
  const perPage = 5;
  useEffect(() => {
    getGenres();
    console.log("check genres here", genres);
  }, [page]);

  const getGenres = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/genres?key=${key}&page=${page}&page_size=${perPage}&search=${searchVal}`
      );
      setGenres(data.results);
      setTotal(Math.ceil(data.count / perPage));
      console.log("check the data here for genres", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const nextPage = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  const prevPage = () => {
    setPage((prev) => {
      return prev - 1;
    });
  };
  const goToPage = (pageNum) => {
    setPage(pageNum);
  };

  const changeGenres = (index, genreId) => {
    setFindIndex(index);
    onGenreSelect(genreId);
  };

  return (
    <>

    {genres.length == 0 ? <Spinner /> :
    <div>

      <div>
        {genres.map((genre, key) => (
          <div
            onClick={() => changeGenres(key, genre.id)}
            key={key}
            className={`flex items-center gap-2 my-1 cursor-pointer p-3 hover:bg-gray-300 hover:rounded-lg ${
              findIndex === key ? "bg-gray-300 rounded-lg" : ""
            }`}
          >
            <img
              src={genre.image_background}
              alt="genreimg"
              width={60}
              height={60}
              className={`hover:scale-125 object-cover' ${
                findIndex === key ? "scale-125" : ""
              }`}
            />
            <h2>{genre.name}</h2>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
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
          {[...Array(total)].map((el, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 rounded-full dark:bg-gray-900 ${
                page === index + 1 ? "dark:bg-blue-600 bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={nextPage}
          className={`py-2 px-6 rounded-lg bg-blue-600 ${
            page === total ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === total}
        >
          Next{" "}
        </button>
      </div>
    </div>

      }
    </>
  );
}

export default Genres;
