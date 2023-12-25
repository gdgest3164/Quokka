import { useState } from "react";
// import useDarkSide from "../utils/useDarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Theme, useTheme } from "../utils/theme-provider";

export default function Switcher() {
  //   const [colorTheme, setTheme] = useDarkSide();
  const [theme, setTheme] = useTheme();
  const [darkSide, setDarkSide] = useState(theme === "light" ? true : false);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? Theme.DARK : Theme.LIGHT);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch className="m-8 w-full" checked={darkSide} onChange={toggleDarkMode} size={30} />
    </>
  );
}
