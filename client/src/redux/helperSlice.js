import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  openModal: false,
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeCredentials: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
    toggleModal: (state) => {
      state.openModal = !state.openModal;
    },
  },
});

export const { setCredentials, removeCredentials, toggleModal } =
  helperSlice.actions;

export default helperSlice.reducer;