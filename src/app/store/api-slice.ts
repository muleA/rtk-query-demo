import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base-query";
import { showNotification } from "@mantine/notifications";
import { FetchBaseQueryError, FetchArgs } from "@reduxjs/toolkit/query";
import { ApiTags, TAGS } from "./tags";

// Define query arguments
type QueryArgs = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  tags?: ApiTags[];
};

// Define API response type
type ApiResponse<T = unknown> = T;

// Create API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  >,
  tagTypes: TAGS, // Use imported TAGS here
  endpoints: (builder) => ({
    genericQuery: builder.query<ApiResponse, QueryArgs>({
      query: ({ url, method = "GET", body }) => ({
        url,
        method,
        body,
      }),
      providesTags: (result, error, { tags = [] }) =>
        tags.map((tag) => ({ type: tag, id: "LIST" })),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          showNotification({
            title: "Success",
            message: `Request successful: ${JSON.stringify(result.data)}`,
            color: "green",
          });
        } catch (error) {
          showNotification({
            title: "Error",
            message: `Request failed: ${JSON.stringify(error, null, 2)}`,
            color: "red",
          });
        }
      },
    }),
    genericMutation: builder.mutation<ApiResponse, QueryArgs>({
      query: ({ url, method = "POST", body }) => ({
        url,
        method,
        body,
      }),
      invalidatesTags: (result, error, { tags = [] }) => {
        if (result) {
          showNotification({
            title: "Success",
            message: `Action successful: ${JSON.stringify(result)}`,
            color: "green",
          });
        }
        if (error) {
          showNotification({
            title: "Error",
            message: `Action failed: ${JSON.stringify(error, null, 2)}`,
            color: "red",
          });
        }
        return tags.map((tag) => ({ type: tag, id: "LIST" }));
      },
    }),
  }),
});

export const {
  useGenericQueryQuery,
  useLazyGenericQueryQuery,
  useGenericMutationMutation,
} = apiSlice;
