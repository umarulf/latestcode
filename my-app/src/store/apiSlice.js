import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8080";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    getLabels: builder.query({
      query: (pageData) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in local storage.");
          return;
        }

        return {
          url: `/v1/transaction/list?userId=${userId}`,
          method: "POST",
          body: pageData,
        };
      },
      providesTags: ["transaction"],
    }),

    addTransaction: builder.mutation({
      query: (transactionData) => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("User ID not found in local storage.");
          return;
        }

        return {
          url: `/v1/transaction?userId=${userId}`,
          method: "POST",
          body: transactionData,
        };
      },
      invalidatesTags: ["transaction"],
    }),

    deleteTransaction: builder.mutation({
      query: (recordId) => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("User ID not found in local storage.");
          return;
        }

        return {
          url: `/v1/transaction/${recordId}?userId=${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["transaction"],
    }),
  }),
});

export default apiSlice;
