import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  loading: false,
  allEmployeeSR: [],
  allHotelSR: [],
  singleSR: {},
  allSR: [],
};

export const createServiceRequest = createAsyncThunk(
  "hotel/newSR",
  async (SR, thunkAPI) => {
    try {
      const res = await axios.post("/api/hotel/request/createSR", SR);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const employeeSR = createAsyncThunk(
  "hotel/employeeSR",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/api/hotel/request/employeeSR/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const hotelSR = createAsyncThunk("hotel/SR", async (id, thunkAPI) => {
  try {
    const res = await axios.get(`/api/hotel/request/hotelSR/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const getSingleSR = createAsyncThunk(
  "hotel/singleSR",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/api/hotel/request/singleSR/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateSR = createAsyncThunk(
  "hotel/updateSR",
  async ({ id, sr }, thunkAPI) => {
    try {
      const res = await axios.put(`/api/hotel/request/singleSR/${id}`, sr);

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const serviceRequestSlice = createSlice({
  name: "serviceRequest",
  initialState,
  extraReducers: {
    [createServiceRequest.pending]: (state) => {
      state.loading = true;
    },
    [createServiceRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success(payload.msg);
    },
    [createServiceRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [employeeSR.pending]: (state) => {
      state.loading = true;
    },
    [employeeSR.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allEmployeeSR = payload.sr;
      toast.success(payload.msg);
    },
    [employeeSR.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [hotelSR.pending]: (state) => {
      state.loading = true;
    },
    [hotelSR.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allHotelSR = payload.sr;
      toast.success(payload.msg);
    },
    [hotelSR.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [getSingleSR.pending]: (state) => {
      state.loading = true;
    },
    [getSingleSR.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.singleSR = payload.sr;
    },
    [getSingleSR.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [updateSR.pending]: (state) => {
      state.loading = true;
    },
    [updateSR.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success(payload.msg);
    },
    [updateSR.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

export default serviceRequestSlice.reducer;
