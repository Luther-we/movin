import React from 'react'

const useEffectDarkMode = () => {
  const [themeState, setThemeState] = React.useState({
    dark: false,
    hasThemeLoaded: false,
  });
  React.useEffect(() => {
    const IsDark = localStorage.getItem("dark") === "true";
    setThemeState(t => ({ ...t, dark: IsDark, hasThemeLoaded: true }));
  }, []);

  return [themeState, setThemeState];
};

export { useEffectDarkMode };
