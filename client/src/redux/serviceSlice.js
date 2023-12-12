import { apiSlice } from "./apiSlice";

export const serviceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newComplaint: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/service/complaint/${id}`,
        method: "POST",
        body: form,
      }),
    }),
  }),
});

export const { useNewComplaintMutation } = serviceSlice;
