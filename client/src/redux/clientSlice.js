import { apiSlice } from "./apiSlice";

export const clientSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerClient: builder.mutation({
      query: (data) => ({
        url: "/api/client/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterClientMutation } = clientSlice;
