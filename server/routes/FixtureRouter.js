import { Router } from "express";
import { getFixtures } from "../service/apiFootballService.js";

const router = Router();

// Fetch fixtures from API-Football for EURO 2024
router.get("/fixtures", async (req, res) => {
  try {
    const fixtures = await getFixtures();
    res.send(fixtures);
  } catch (error) {
    res
      .status(500)
      .send({
        error: "Failed to fetch fixtures from API-Football",
        details: error.message,
      });
  }
});

export { router as FixtureRouter };
