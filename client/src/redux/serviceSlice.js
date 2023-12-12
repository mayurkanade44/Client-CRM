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
    singleComplaint: builder.query({
      query: (id) => ({
        url: `/api/service/singleComplaint/${id}`,
      }),
      providesTags: ["Complaint"],
      keepUnusedDataFor: 30,
    }),
  }),
});

export const {
  useNewComplaintMutation,
  useAllClientComplaintsQuery,
  useSingleComplaintQuery,
} = serviceSlice;
