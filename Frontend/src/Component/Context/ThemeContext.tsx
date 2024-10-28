import { createContext } from "react";

interface IThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

function ThemeContext() {
  createContext<IThemeContextType>({
    theme: "light",
    setTheme: () => {},
  });
}

export default ThemeContext;