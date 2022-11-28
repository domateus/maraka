import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    push: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((u) => u.name !== action.payload);
    },
    set: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    gotUnreadMessages: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.map((u) =>
        u.name === action.payload ? { ...u, hasUnreadMessages: true } : u
      );
    },
    readMessages: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.map((u) =>
        u.name === action.payload ? { ...u, hasUnreadMessages: false } : u
      );
    },
    canScrollToNewMessages: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.map((u) =>
        u.name === action.payload ? { ...u, canScrollToNewMessages: true } : u
      );
    },
    noMessagesToScrollTo: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.map((u) =>
        u.name === action.payload ? { ...u, canScrollToNewMessages: false } : u
      );
    },
  },
});

export const {
  push,
  remove,
  set,
  gotUnreadMessages,
  readMessages,
  canScrollToNewMessages,
  noMessagesToScrollTo,
} = contactsSlice.actions;

export default contactsSlice.reducer;
