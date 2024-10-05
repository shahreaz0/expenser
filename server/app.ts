import { Hono } from "hono";
import { rootRoute } from "./routes";

export const app = new Hono();

app.route("/", rootRoute);

app.get("/healthcheck", (c) => {
  return c.json({ message: "Ok", timestamp: Date.now() });
});
