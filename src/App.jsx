import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import { ThemeContext } from "./Context/ThemeContext";
function App() {
  const [theme, setTheme] = useState('light')
useEffect(()=> {
  setTheme(window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : null)
},[])
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
   <div className={`${theme} ${theme === 'dark' ? 'bg-black' : ''}`}>
      <Header  />
      <Home /> 
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
