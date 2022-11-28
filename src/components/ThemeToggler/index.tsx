import { toggleTheme } from "@context/session";
import { RootState } from "@context/store";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";

const ThemeToggle = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state: RootState) => state.session);
  return (
    <S.Button onClick={() => dispatch(toggleTheme())}>
      {theme === "dark" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </S.Button>
  );
};

export default ThemeToggle;
