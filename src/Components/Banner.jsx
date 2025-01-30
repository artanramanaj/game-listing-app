import React from "react";

function Banner({ gameListing }) {
  return (
    <div className="relative inset-0 bg-black dark:opacity-80 ">
      <img
        src={gameListing.background_image}
        className="md:h-[400px] w-full object-cover object-[center_top] rounded-lg"
      />
      <div className="absolute bottom-1 left-1">
        <h2 className="text-[28px] text-white  font-bold ">{gameListing.name}</h2>
        <button className="bg-red-900 text-white">Get Now</button>
      </div>
    </div>
  );
}

export default Banner;
