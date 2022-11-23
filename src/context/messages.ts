import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuidv4 } from "../utils";

export interface MessageState {
  messages: {
    [key: string]: Message[];
  };
}

const initialState: MessageState = {
  messages: {},
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    push: (state, action: PayloadAction<Message & { channel: string }>) => {
      const { from, channel, text } = action.payload;
      const messages = state.messages[channel] || [];
      const message = { from, text, id: uuidv4() };
      console.log("push", message);
      messages.push(message);
      state.messages[channel] = messages;
    },
  },
});

export const { push } = messageSlice.actions;

export default messageSlice.reducer;
