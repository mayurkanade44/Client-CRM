import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  loading: false,
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
  },
});

export default serviceRequestSlice.reducer;
