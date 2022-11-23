import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  user: string;
  userToChat: string;
  theme: "light" | "dark";
  hasDefinedName: boolean;
}

const initialState: SessionState = {
  user: "",
  userToChat: "",
  theme: "dark",
  hasDefinedName: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setUserToChat: (state, action: PayloadAction<string>) => {
      state.userToChat = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    defineName: (state) => {
      state.hasDefinedName = true;
    },
  },
});

export const { setUser, setUserToChat, toggleTheme, defineName } =
  sessionSlice.actions;

export default sessionSlice.reducer;
