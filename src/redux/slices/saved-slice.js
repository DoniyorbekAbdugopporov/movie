import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("saved", serializedState);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("saved");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Error loading from localStorage", error);
    return [];
  }
};

const savedSlice = createSlice({
  name: "saved",
  initialState: {
    value: loadFromLocalStorage(),
  },
  reducers: {
    addMovie(state, action) {
      const index = state.value.findIndex(({ id }) => id === action.payload.id);
      if (index < 0) {
        state.value.push(action.payload);
      } else {
        state.value = state.value.filter(({ id }) => id !== action.payload.id);
      }

      saveToLocalStorage(state.value);
    },
  },
});

export const { addMovie } = savedSlice.actions;
export default savedSlice.reducer;
