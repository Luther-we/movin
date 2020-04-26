import React from "react";
import { useEffectDarkMode } from "./useEffectDarkMode";

const defaultContextData = {
  dark: false,
  toggle: () => {},
};

const ThemeContext = React.createContext(defaultContextData);
const useTheme = () => React.useContext(ThemeContext);


const ThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useEffectDarkMode();

  if (!themeState.hasThemeLoaded) {
    return <div />
  }

  const toggle = () => {
    const dark = !themeState.dark
    localStorage.setItem('dark', JSON.stringify(dark))
    setThemeState({ ...themeState, dark})
  }

  return (
    <ThemeContext.Provider 
      value={{
        dark: themeState.dark,
        toggle
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, useTheme }