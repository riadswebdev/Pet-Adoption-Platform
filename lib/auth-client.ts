import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const backendBaseUrl = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  process.env.BETTER_AUTH_URL ||
  "http://localhost:8000"
).replace(/\/$/, "");

const authBaseUrl = `${backendBaseUrl.replace(/\/api\/auth\/?$/, "")}/api/auth`;

export const authClient = createAuthClient({
  baseURL: authBaseUrl,
  plugins: [jwtClient()],
  fetchOptions: {
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
