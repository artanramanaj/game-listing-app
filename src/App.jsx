import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import { ThemeContext } from "./Context/ThemeContext";
function App() {
  const [theme, setTheme] = useState('light')
  const [search, setSearch] = useState('')
useEffect(()=> {
  setTheme(window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : null)
},[])



  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
   <div className={`${theme} ${theme === 'dark' ? 'bg-black' : ''}`}>
      <Header setSearch={setSearch} />
      <Home search={search}/> 
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
