import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Theme, useTheme } from "../utils/theme-provider";

export default function Switcher() {
  const [theme, setTheme] = useTheme();
  const [darkSide, setDarkSide] = useState(theme === "light" ? false : true);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? Theme.DARK : Theme.LIGHT);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={30} />
    </>
  );
}
