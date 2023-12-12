import { apiSlice } from "./apiSlice";

export const serviceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newComplaint: builder.mutation({
      query: (form) => ({
        url: `/api/complaint/65741379f93ccb17fef1af47`,
        method: "POST",
        body: form,
      }),
    }),
  }),
});

export const { useNewComplaintMutation } = serviceSlice;
