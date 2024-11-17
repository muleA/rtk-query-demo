import {
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  QueryReturnValue,
} from "@reduxjs/toolkit/query";
import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import { showNotification } from "@mantine/notifications";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
  credentials: "include", // Include cookies with cross-origin requests if needed
});

// Enhanced base query with reauthentication and Mantine notifications
export const baseQueryWithReauth: unknown = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // Perform the initial query
  let result: QueryReturnValue<unknown, FetchBaseQueryError, unknown> =
    await baseQuery(args, api, extraOptions);

  // Check if the error is a 401 Unauthorized
  if (result.error?.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        // Attempt to refresh the token
        const refreshResponse = await fetch(
          process.env.NEXT_PUBLIC_REFRESH_URL ?? "/refresh-token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: refreshToken }),
          }
        );

        if (refreshResponse.ok) {
          const { accessToken } = await refreshResponse.json();

          // Save the new token
          localStorage.setItem("accessToken", accessToken);

          // Retry the original query with the new token
          if (typeof args === "string") {
            result = await baseQuery(
              {
                url: args,
                headers: { authorization: `Bearer ${accessToken}` },
              },
              api,
              extraOptions
            );
          } else {
            result = await baseQuery(
              {
                ...args,
                headers: {
                  ...(args.headers || {}),
                  authorization: `Bearer ${accessToken}`,
                },
              },
              api,
              extraOptions
            );
          }
        } else {
          showNotification({
            title: "Session Expired",
            message: "Please log in again.",
            color: "red",
          });
          api.dispatch({ type: "auth/logout" });
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        showNotification({
          title: "Error",
          message: "Failed to refresh session. Please log in again.",
          color: "red",
        });
        api.dispatch({ type: "auth/logout" });
      }
    } else {
      api.dispatch({ type: "auth/logout" });
    }
  }

  // Notify user of any non-401 errors
  if (result.error && result.error.status !== 401) {
    showNotification({
      title: "Error",
      message: result.error.data
        ? JSON.stringify(result.error.data)
        : "An unexpected error occurred.",
      color: "red",
    });
  }

  // Success notification (optional, depending on your requirements)
  if (!result.error) {
    showNotification({
      title: "Success",
      message: "Request completed successfully!",
      color: "green",
    });
  }

  return result;
};
