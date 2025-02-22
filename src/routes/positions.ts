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
  try {
    const { name, parentId } = await c.req.json();

    const [newPosition] = await db.insert(positionTable).values({ name, parentId }).returning();
    return c.json(newPosition);
  } catch (error) {
    console.error("Error inserting position:", error);
    return c.json({ error: "Failed to insert position" }, 500);
  }
});

// Edit (update) a position
positionsRoute.put("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const { name, parentId } = await c.req.json();

    const [updatedPosition] = await db
      .update(positionTable)
      .set({ name, parentId })
      .where(eq(positionTable.id, Number(id)))
      .returning();

    return c.json(updatedPosition);
  } catch (error) {
    console.error("Error updating position:", error);
    return c.json({ error: "Failed to update position" }, 500);
  }
});

// Delete a position
positionsRoute.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const [deletedPosition] = await db
      .delete(positionTable)
      .where(eq(positionTable.id, Number(id)))
      .returning();

    return c.json(deletedPosition);
  } catch (error) {
    console.error("Error deleting position:", error);
    return c.json({ error: "Failed to delete position" }, 500);
  }
});

export default positionsRoute;