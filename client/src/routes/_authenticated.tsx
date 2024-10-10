import { currentUserQueryOptions } from "@/hooks/rq/auth/use-get-current-user";
import { createFileRoute, Outlet } from "@tanstack/react-router";

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.fetchQuery(currentUserQueryOptions);

      return data;
    } catch (error) {
      console.log(error);

      return { user: null };
    }
  },
  component: Component,
});

function Component() {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }

  return <Outlet />;
}

function Login() {
  return <section>Please login</section>;
}
