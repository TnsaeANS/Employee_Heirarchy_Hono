import { serve } from "@hono/node-server";
import { Hono } from "hono";
import positionsRoute from "./routes/positions.js";
import { cors } from "hono/cors";

const app = new Hono();

// Use CORS middleware globally
app.use(cors({ origin: "http://localhost:3001" }));

// Basic route
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Use the positions routes for /position
app.route("/position", positionsRoute);

// Start the server and listen on a port
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
