import { useEffect, useState } from "react";
import { Dark, Light } from "../../../Elements/Icons";

export default function Theme() {
  const [theme, setTheme] = useState("light");
 
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  return (
    <>
      <>
        <button onClick={toggleTheme} className="themeB">
          {theme === "light" ?  <Dark /> : <Light />}
        </button>
      </>
    </>
  );
}
