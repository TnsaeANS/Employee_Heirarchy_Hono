import { serve } from "@hono/node-server";
import { Hono } from "hono";
import positionsRoute from "./routes/positions.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Use the users routes
app.route("/position", positionsRoute);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});