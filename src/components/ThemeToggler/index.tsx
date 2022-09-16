import { useContext } from "react";
import { Context } from "../../context";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(Context);
  return (
    <button onClick={toggleTheme}>{theme === "light" ? "🔦" : "💡"}</button>
  );
};

export default ThemeToggle;
