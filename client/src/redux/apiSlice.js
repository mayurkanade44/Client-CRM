import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({ baseUrl: "/" });
const authBaseQuery = async (args, api, extraOption) => {
  const result = await baseQuery(args, api, extraOption);
  if (result.error && result.error.status === 401) {
    toast.error("Unauthorized!! logged out");
    return;
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: authBaseQuery,
  tagTypes: ["User", "Client", "Admin", "Location", "Complaint"],
  endpoints: (builder) => ({}),
});
