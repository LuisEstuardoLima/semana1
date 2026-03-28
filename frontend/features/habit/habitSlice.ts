import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHabits } from "./habitAPI";

interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

interface HabitsState {
  items: Habit[];
}

const initialState: HabitsState = {
  items: [],
};

export const fetchHabitsThunk = createAsyncThunk("habits/fetch", async () => {
  return await fetchHabits();
});

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit(state, action: PayloadAction<Habit>) {
      state.items.push(action.payload);
    },
    toggleHabit(state, action: PayloadAction<string>) {
      const h = state.items.find(h => h.id === action.payload);
      if (h) h.completed = !h.completed;
    },
    removeHabit(state, action: PayloadAction<string>) {
      state.items = state.items.filter(h => h.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
      state.items = action.payload;
    });
}});

export const habitReducer = habitSlice.reducer;
export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;