import { createAuthClient } from "better-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
