import { serve } from "@hono/node-server";
import { Hono } from "hono";
import positionsRoute from "./routes/positions.js";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3001", 
    allowMethods: ["GET", "POST", "DELETE", "PUT"], 
    allowHeaders: ["Content-Type"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/position", positionsRoute);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});