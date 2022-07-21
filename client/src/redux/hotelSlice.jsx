import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  loading: false,
  hotelId: ''
};

export const hotelRegistration = createAsyncThunk(
  "hotel/registration",
  async (hotel, thunkAPI) => {
    try {
      const res = await axios.post("/api/hotel/hotelRegistration", hotel);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  extraReducers: {
    [hotelRegistration.pending]: (state) => {
      state.loading = true;
    },
    [hotelRegistration.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.hotelId = payload.hotel
      toast.success(payload.msg)
    },
    [hotelRegistration.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload)
    },
  },
});

export default hotelSlice.reducer;
