import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import command from "./command";
import contacts from "./contacts";
import messages from "./messages";
import session from "./session";

const combinedReducer = combineReducers({
  contacts,
  messages,
  session,
  command,
});

export const store = configureStore({ reducer: combinedReducer });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<typeof store>(() => store);
