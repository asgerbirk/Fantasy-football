import { Router, Request, Response } from "express";
import { getFixtures, getPlayers } from "../services/apiFootballService.js";
const router = Router();

router.get("/fixtures", async (req, res) => {
  try {
    const fixtures = await getFixtures();
    res.send(fixtures);
  } catch (error) {
    res.status(500).send({
      error: "Failed to fetch fixtures from API-Football",
      details: error.message,
    });
  }
});

export { router as FixtureRouter };
