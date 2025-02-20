import { db } from "../db/index.js";
import { Hono } from "hono";
import { positionTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

const positionsRoute = new Hono();

// Get all positions
positionsRoute.get("/", async (c) => {
  const allPositions = await db.query.positionTable.findMany();
  return c.json(allPositions);
});

// Get a position by id
positionsRoute.get("/:id", async (c) => {
  const { id } = c.req.param();
  const positionResp = await db.query.positionTable.findFirst({
    where: eq(positionTable.id, Number(id)),
  });
  return c.json(positionResp);
});

// Create a position
positionsRoute.post("/", async (c) => {
  const { name, description } = await c.req.json();
  const newPositionResp = await db.insert(positionTable).values({ name, description });
  return c.json(newPositionResp);
});

export default positionsRoute;