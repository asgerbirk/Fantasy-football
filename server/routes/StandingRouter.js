import { Router } from "express";
import { getStandings } from "../service/apiFootballService.js";

const router = Router();

// Fetch standings from API-Football for EURO 2024
router.get("/standings", async (req, res) => {
  try {
    const standings = await getStandings();
    res.send(standings);
  } catch (error) {
    res
      .status(500)
      .send({
        error: "Failed to fetch standings from API-Football",
        details: error.message,
      });
  }
});

export { router as StandingRouter };
