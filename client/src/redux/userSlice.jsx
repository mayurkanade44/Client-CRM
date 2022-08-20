import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authFetch, unauthorizedResponse } from "../utilis/axios";
import { clearHotel } from "./hotelSlice";
import { clearSR } from "./serviceReqSlice";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  allUsers: [],
  allEmployees: [],
};

export const epcornLogin = createAsyncThunk(
  "epcorn/login",
  async (user, thunkAPI) => {
    try {
      const res = await authFetch.post("/epcorn/login", user);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const epcornRegister = createAsyncThunk(
  "epcorn/register",
  async (user, thunkAPI) => {
    try {
      const res = await authFetch.post("/epcorn/register", user);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const allEpcornUsers = createAsyncThunk(
  "epcorn/allUsers",
  async (_, thunkAPI) => {
    try {
      const res = await authFetch.get("/epcorn/allUSers");
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const epcornDelete = createAsyncThunk(
  "epcorn/delete",
  async (id, thunkAPI) => {
    try {
      const res = await authFetch.delete(`/epcorn/delete/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const hotelLogin = createAsyncThunk(
  "hotel/login",
  async (user, thunkAPI) => {
    try {
      const res = await authFetch.post("/hotel/hotelLogin", user);
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
      const res = await authFetch.post("/hotel/employee/register", user);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const hotelEmployeeLogin = createAsyncThunk(
  "hotel/employeeLogin",
  async (user, thunkAPI) => {
    try {
      const res = await authFetch.post("/hotel/employee/login", user);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const allHotelEmployees = createAsyncThunk(
  "hotel/allEmployees",
  async (id, thunkAPI) => {
    try {
      const res = await authFetch.get(`/hotel/employee/allEmployees/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const employeeDeletion = createAsyncThunk(
  "hotel/employeeDeletion",
  async (id, thunkAPI) => {
    try {
      const res = await authFetch.delete(`/hotel/employee/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return unauthorizedResponse(error, thunkAPI);
    }
  }
);

export const clearStore = createAsyncThunk(
  "users/clearStore",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(logout());
      thunkAPI.dispatch(clearHotel());
      thunkAPI.dispatch(clearSR());
      thunkAPI.dispatch(clearUsers());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    clearUsers: (state) => initialState,
  },
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
    [epcornRegister.pending]: (state) => {
      state.loading = true;
    },
    [epcornRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success(payload.msg);
    },
    [epcornRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [allEpcornUsers.pending]: (state) => {
      state.loading = true;
    },
    [allEpcornUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allUsers = payload.users;
      toast.success(payload.msg);
    },
    [allEpcornUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [epcornDelete.pending]: (state) => {
      state.loading = true;
    },
    [epcornDelete.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload.msg);
    },
    [epcornDelete.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
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
    [allHotelEmployees.pending]: (state) => {
      state.loading = true;
    },
    [allHotelEmployees.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allUsers = payload.employees;
      toast.success(payload.msg);
    },
    [allHotelEmployees.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [employeeDeletion.pending]: (state) => {
      state.loading = true;
    },
    [employeeDeletion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success(payload.msg);
    },
    [employeeDeletion.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [hotelEmployeeLogin.pending]: (state) => {
      state.loading = true;
    },
    [hotelEmployeeLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(payload.user));
      toast.success(`Welcome ${payload.user.name}`);
    },
    [hotelEmployeeLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    [clearStore.rejected]: () => {
      toast.error("There was an error..");
    },
  },
});

export default userSlice.reducer;
export const { logout, clearUsers } = userSlice.actions;
