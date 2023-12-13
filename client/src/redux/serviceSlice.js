import { apiSlice } from "./apiSlice";

export const serviceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newComplaint: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/service/clientComplaint/${id}`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Complaint"],
    }),
    singleClientComplaints: builder.query({
      query: () => ({
        url: "/api/service/clientComplaint/allComplaints",
      }),
      providesTags: ["Complaint"],
      keepUnusedDataFor: 30,
    }),
    singleComplaint: builder.query({
      query: (id) => ({
        url: `/api/service/singleComplaint/${id}`,
      }),
      providesTags: ["Complaint"],
      keepUnusedDataFor: 30,
    }),
    updateComplaint: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/service/singleComplaint/${id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["Complaint"],
    }),
    allComplaints: builder.query({
      query: () => ({
        url: "/api/service/allComplaints",
      }),
      providesTags: ["Complaint"],
    }),
  }),
});

export const {
  useNewComplaintMutation,
  useSingleClientComplaintsQuery,
  useSingleComplaintQuery,
  useUpdateComplaintMutation,
  useAllComplaintsQuery,
} = serviceSlice;
