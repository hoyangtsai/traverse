import React, { useMemo } from 'react';

import useTheme from '@theme/hooks/useTheme';
import ThemeContext from '@theme/ThemeContext';


function ThemeProvider(props) {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();
  const contextValue = useMemo(
    () => ({ isDarkTheme, setLightTheme, setDarkTheme }),
    [isDarkTheme, setLightTheme, setDarkTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;