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
  psk: SessionKeyPair;
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
  psk: { p: "", q: "", a: "" },
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
    setPrimes: (state, action: PayloadAction<SessionKeyPair>) => {
      state.psk = action.payload;
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
  setPrimes,
  setRsa,
} = sessionSlice.actions;

export default sessionSlice.reducer;
