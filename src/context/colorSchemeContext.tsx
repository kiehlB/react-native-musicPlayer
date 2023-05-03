import React, { createContext, useContext, useState } from 'react';

type ColorScheme = 'light' | 'dark';

interface ColorSchemeContextValue {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

interface ColorSchemeProviderProps {
  children: React.ReactNode;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  colorScheme: 'light',
  toggleColorScheme: () => {},
});

export const useColorSchemeContext = () => useContext(ColorSchemeContext);

export const ColorSchemeProvider: React.FC<ColorSchemeProviderProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = () => {
    setColorScheme(prevScheme => (prevScheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
