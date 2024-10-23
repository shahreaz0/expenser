import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { serveStatic } from "hono/bun";
import { expensesRoute } from "./routes/expenses.route";
import { authRoute } from "./routes/auth.route";

export const app = new Hono();

const apiRoutes = app
  .basePath("/api/v1")
  .route("/expenses", expensesRoute)
  .route("/", authRoute);

app.get("/healthcheck", (c) => {
  return c.json({ message: "Ok", timestamp: Date.now() });
});

app.use("*", serveStatic({ root: "./client/dist" }));
app.use("*", serveStatic({ path: "./client/dist/index.html" }));

app.onError((error, c) => {
  console.error(error.message);

  if (error instanceof HTTPException && error.status) {
    c.status(error.status);
    return c.json({ message: error.message, status: error.status });
  }

  c.status(500);
  return c.json({ message: error.message, status: 500 });
});

export type ApiRoutes = typeof apiRoutes;
