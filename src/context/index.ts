import React from "react";

export const Context = React.createContext({
  theme: "light",
  toggleTheme: () => {},
  user: "",
  setUser: (name: string) => {},
  userToChat: "",
  setUserToChat: (name: string) => {},
  contacts: [] as Contact[],
  setContacts: (contacts: Contact[]) => {},
  getUserMessages: (username: string) => [] as Message[],
  pushUserMessage: (message: Message, username: string) => {},
});
