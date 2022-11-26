import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const SCROLL_DOWN = "SCROLL_DOWN";
export const commandSet: { [key in CommandSet]: CommandSet } = { SCROLL_DOWN };

type CommandSet = typeof SCROLL_DOWN;

interface Command {
  targetId: string;
  name: CommandSet;
}

interface CommandState {
  commands: Command[];
}

const initialState: CommandState = {
  commands: [],
};

const commandSlice = createSlice({
  name: "command",
  initialState,
  reducers: {
    tell: (state, action: PayloadAction<Command>) => {
      state.commands.push(action.payload);
    },
    obey: (state, action: PayloadAction<CommandSet>) => {
      state.commands = state.commands.filter((c) => c.name !== action.payload);
    },
  },
});

export const { tell, obey } = commandSlice.actions;

export default commandSlice.reducer;
