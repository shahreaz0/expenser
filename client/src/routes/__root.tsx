import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useGetCurrentUser } from "@/hooks/rq/auth/use-get-current-user";

interface MyRouterContext {
  queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Navbar() {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className="px-16 py-2 flex gap-4 justify-between">
      <div className="space-x-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
      <div className="space-x-4">
        {currentUser ? (
          <a href="/api/v1/logout">Logout</a>
        ) : (
          <>
            <a href="/api/v1/login">Login</a>
            <a href="/api/v1/register">Register</a>
          </>
        )}
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
