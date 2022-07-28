import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  allUsers: [],
};

export const epcornLogin = createAsyncThunk(
  "epcorn/login",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post("/api/epcorn/login", user);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const epcornSlice = createSlice({
  name: "Epcorn",
  initialState,
  extraReducers: {
    [epcornLogin.pending]: (state) => {
      state.loading = true;
    },
    [epcornLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(payload.user));
      toast.success(`Welcome ${payload.user.name}`);
    },
    [epcornLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

export default epcornSlice.reducer;
