import { Hono } from "hono";
import { expensesRoute } from "./expenses.route";

export const rootRoute = new Hono().basePath("/api/v1");

rootRoute.route("/expenses", expensesRoute);
