import { apiSlice } from "./apiSlice";

export const clientSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerClient: builder.mutation({
      query: (data) => ({
        url: "/api/client/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    allClients: builder.query({
      query: () => ({
        url: "/api/client",
      }),
      providesTags: ["Client"],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useRegisterClientMutation, useAllClientsQuery } = clientSlice;
