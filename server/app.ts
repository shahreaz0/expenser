import { Hono } from "hono";
import { rootRoute } from "./routes";
import { HTTPException } from "hono/http-exception";

export const app = new Hono();

app.route("/", rootRoute);

app.get("/healthcheck", (c) => {
  return c.json({ message: "Ok", timestamp: Date.now() });
});

app.onError((error, c) => {
  console.error(error.message);

  if (error instanceof HTTPException && error.status) {
    c.status(error.status);
    return c.json({ message: error.message, status: error.status });
  }

  return c.json({ message: error.message, status: 500 });
});