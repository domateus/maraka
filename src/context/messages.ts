import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageState {
  messages: {
    [key: string]: Message<TextPayload>[];
  };
}

const initialState: MessageState = {
  messages: {},
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    push: (
      state,
      action: PayloadAction<Message<TextPayload> & { channel: string }>
    ) => {
      const { channel } = action.payload;
      const messages = state.messages[channel] || [];
      const message: Message<TextPayload> = action.payload;
      messages.push(message);
      state.messages[channel] = messages;
    },
  },
});

export const { push } = messageSlice.actions;

export default messageSlice.reducer;
