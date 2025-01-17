import React from "react";
import Genres from "../Components/Genres";

function Home() {
  return <div className="dark:text-white grid grid-cols-4">
    <div className="col-span-1  h-full flex flex-col gap-4 ">
      <h2 className="text-">Genres</h2>
      <Genres />
    </div>

    <div className="col-span-3 bg-blue-500 h-full">
      <h1>games</h1>
    </div>
  </div>;
}

export default Home;
