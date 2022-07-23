import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
};

export const hotelLogin = createAsyncThunk(
  "hotel/login",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post("/api/hotel/hotelLogin", user);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const hotelEmployeeRegistration = createAsyncThunk(
  "hotel/employeeRegistration",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post("/api/hotel/employee/register", user);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const hotelEmpSlice = createSlice({
  name: "Employee",
  initialState,
  extraReducers: {
    [hotelLogin.pending]: (state) => {
      state.loading = true;
    },
    [hotelLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(payload.user));
      toast.success(`Welcome ${payload.user.hotelName}`);
    },
    [hotelLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [hotelEmployeeRegistration.pending]: (state) => {
      state.loading = true;
    },
    [hotelEmployeeRegistration.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success(payload.msg);
    },
    [hotelEmployeeRegistration.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

export default hotelEmpSlice.reducer;
