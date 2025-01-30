import React, { useEffect, useState } from "react";
import Genres from "../Components/Genres";
import { axiosInstance, key } from "./../Services/GlobalApi.jsx";
import Banner from "../Components/Banner.jsx";

function Home() {
  const [allGameList, setAllGameList] = useState([]);

  useEffect(() => {
    getAllGamesList();
  }, []);

  const getAllGamesList = async () => {
    try {
      const { data } = await axiosInstance.get(`/games?key=${key}`);
      console.log("check the response here", data.results);
      setAllGameList(data.results);
    } catch (error) {
      console.log("check game error", error);
    }
  };

  return (
    <div className="dark:text-white grid grid-cols-4 gap-4">
      <div className="col-span-1  h-full flex flex-col gap-2 ">
        <h2 className="text-[40px] mt-2">Genres</h2>
        <Genres />
      </div>

      <div className="col-span-3  h-full">
        {allGameList.length > 0 ? (
          <Banner gameListing={allGameList[0]} />
        ) : null}
      </div>
    </div>
  );
}

export default Home;
