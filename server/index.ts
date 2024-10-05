import { app } from "./app";

const server = Bun.serve({
  fetch: app.fetch,
  port: "3000",
});

console.log(`http://localhost:${server.port}`);
