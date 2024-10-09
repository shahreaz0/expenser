import { createFileRoute, Outlet } from "@tanstack/react-router";

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    console.log(location);
  },

  component: () => {
    const isLoggedIn = false;
    if (isLoggedIn) {
      return <Login />;
    }

    return <Outlet />;
  },
});

function Login() {
  return <section>Please login</section>;
}
