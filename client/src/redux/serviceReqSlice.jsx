import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authFetch, unauthorizedResponse } from "../utilis/axios";

const initialState = {
  loading: false,
  allEmployeeSR: [],
  allHotelSR: [],
  singleSR: {},
  allSR: [],
  stats: [],
  numOfPages: 1,
  page: 1,
  totalSR: 0,
};

export const createServiceRequest = createAsyncThunk(
  "hotel/newSR",
  async (SR, thunkAPI) => {
    try {
      const res = await authFetch.post("/hotel/request/createSR", SR);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const employeeSR = createAsyncThunk(
  "hotel/employeeSR",
  async ({ id, search, status }, thunkAPI) => {
    const { page } = thunkAPI.getState().serviceRequest;
    try {
      let url = `/hotel/request/employeeSR/${id}?page=${page}&&status=${status}`;
      if (search) {
        url += `&search=${search}`;
      }
      const res = await authFetch.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const hotelSR = createAsyncThunk(
  "hotel/SR",
  async ({ id, search, status }, thunkAPI) => {
    const { page } = thunkAPI.getState().serviceRequest;
    try {
      let url = `/hotel/request/hotelSR/${id}?page=${page}&&status=${status}`;
      if (search) {
        url += `&search=${search}`;
      }
      const res = await authFetch.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const getSingleSR = createAsyncThunk(
  "hotel/singleSR",
  async (id, thunkAPI) => {
    try {
      const res = await authFetch.get(`/hotel/request/singleSR/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const updateSR = createAsyncThunk(
  "hotel/updateSR",
  async ({ id, sr }, thunkAPI) => {
    try {
      const res = await authFetch.put(`/hotel/request/singleSR/${id}`, sr);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const serviceStats = createAsyncThunk(
  "hotel/SRstats",
  async (id, thunkAPI) => {
    try {
      const res = await authFetch.get(`/hotel/request/srStats/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

const serviceRequestSlice = createSlice({
  name: "serviceRequest",
  initialState,
  reducers: {
    clearSR: (state) => initialState,
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: {
    [createServiceRequest.pending]: (state) => {
      state.loading = true;
      toast.info("Service request being generated", {
        autoClose: 2000,
      });
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
      state.numOfPages = payload.numPages;
      state.totalSR = payload.totalSR;
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
      state.numOfPages = payload.numPages;
      state.totalSR = payload.totalSR;
      if (state.allHotelSR.length === 0) {
        toast.error("service request not found");
      }
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
    [serviceStats.pending]: (state) => {
      state.loading = true;
    },
    [serviceStats.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.stats = payload.serviceCount;
    },
    [serviceStats.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

export const { clearSR, changePage } = serviceRequestSlice.actions;
export default serviceRequestSlice.reducer;
