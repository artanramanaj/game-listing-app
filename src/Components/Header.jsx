import React, { useState, useEffect, useContext } from "react";
import Logo from "./../assets/Images/gaming-logo.png";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiMiniSun } from "react-icons/hi2";
import { HiMiniMoon } from "react-icons/hi2";
import { ThemeContext } from "./../Context/ThemeContext";
import { HiMenu } from "react-icons/hi"; // Hamburger icon
import { IoClose } from "react-icons/io5"; // Close icon
function Header({setSearch, setShowModal}) {
  const {theme, setTheme} = useContext(ThemeContext);
  useEffect(() => {
    console.log("check the theme here", theme)
  })
  const toggleTheme = (themeValue) => {
    setTheme(themeValue)
    window.localStorage.setItem('theme', themeValue)
  }
  const getSearchValue = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div className="flex items-center gap-4">
      <img src={Logo} alt="logo" width={60} height={60} />
      <div className="bg-slate-200 w-full flex  items-center rounded-full p-2 gap-2">
        <HiMagnifyingGlass className="text-black" />
        <input
        onChange={getSearchValue}
          type="text"
          className="text-black outline-none bg-transparent w-full"
          placeholder="Search for trending games"
        />
      </div>

      <div>
        {theme == 'light' ? (
          <HiMiniMoon
          onClick={() => toggleTheme('dark')}
            className="bg-slate-200 text-[35px] text-black cursor-pointer rounded-full p-2"
          />
        ) : (
          <HiMiniSun    onClick={() => toggleTheme('light')} className="bg-slate-200 text-[35px] text-black cursor-pointer rounded-full p-2" />
        )}
      </div>
      <div className="flex md:hidden">
      <HiMenu
            onClick={()=> setShowModal(true)}
            className="bg-slate-200 text-[35px] text-black cursor-pointer rounded-full p-2"
          />
      </div>
    </div>
  );
}

export default Header;
