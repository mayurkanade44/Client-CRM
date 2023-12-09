import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isModalOpen: {
    newClient: false,
    delete: false,
    location: false,
    user: false,
  },
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeCredentials: (state) => {
      state.user = null;
      localStorage.clear();
    },
    toggleModal: (state, { payload }) => {
      state.isModalOpen[payload.name] = payload.status;
    },
  },
});

export const { setCredentials, removeCredentials, toggleModal } =
  helperSlice.actions;

export default helperSlice.reducer;
