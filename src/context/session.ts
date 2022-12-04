import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  user: string;
  userToChat: string;
  theme: "light" | "dark";
  hasDefinedName: boolean;
  rsa: {
    publicKey: string;
    privateKey: string;
  };
  dh: DHContants;
  dsa: DSAContants;
}

const initialState: SessionState = {
  user: "",
  userToChat: "",
  theme: "dark",
  hasDefinedName: false,
  rsa: {
    publicKey: "",
    privateKey: "",
  },
  dh: { p: "", q: "", a: "" },
  dsa: { p: "", q: "", g: "", x: "", y: "" },
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
    setDHConstants: (state, action: PayloadAction<DHContants>) => {
      state.dh = action.payload;
    },
    setDSAConstants: (state, action: PayloadAction<DSAContants>) => {
      state.dsa = action.payload;
    },
    setRsa: (
      state,
      action: PayloadAction<{
        publicKey: string;
        privateKey: string;
      }>
    ) => {
      state.rsa = action.payload;
    },
  },
});

export const {
  setUser,
  setUserToChat,
  toggleTheme,
  defineName,
  setDHConstants,
  setRsa,
  setDSAConstants,
} = sessionSlice.actions;

export default sessionSlice.reducer;
