import { apiSlice } from "./apiSlice";

export const serviceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newComplaint: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/service/complaint/${id}`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Complaint"],
    }),
    allClientComplaints: builder.query({
      query: () => ({
        url: "/api/service/complaint/allComplaints",
      }),
      providesTags: ["Complaint"],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useNewComplaintMutation, useAllClientComplaintsQuery } =
  serviceSlice;
