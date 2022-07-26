import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  loading: false,
  allHotels: [],
  allHotelsNames: [],
  singleHotel: {},
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

export const getAllHotelNames = createAsyncThunk(
  "hotel/allHotels",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/hotel/allHotels");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllHotels = createAsyncThunk(
  "hotel/allHotels",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/hotel/allHotels");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const hotelDetails = createAsyncThunk(
  "hotel/singleHotel",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/api/hotel/${id}`);
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
      toast.success(payload.msg);
    },
    [hotelRegistration.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [getAllHotelNames.pending]: (state) => {
      state.loading = true;
    },
    [getAllHotelNames.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allHotelsNames = payload.hotelNames;
    },
    [getAllHotelNames.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [getAllHotels.pending]: (state) => {
      state.loading = true;
    },
    [getAllHotels.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allHotels = payload.hotels;
    },
    [getAllHotels.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [hotelDetails.pending]: (state) => {
      state.loading = true;
    },
    [hotelDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.singleHotel = payload.hotel;
    },
    [hotelDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

export default hotelSlice.reducer;
