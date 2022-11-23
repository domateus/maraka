import { toggleTheme } from "@context/session";
import { RootState } from "@context/store";
import { useDispatch, useSelector } from "react-redux";

const ThemeToggle = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state: RootState) => state.session);
  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {theme === "light" ? "🔦" : "💡"}
    </button>
  );
};

export default ThemeToggle;
