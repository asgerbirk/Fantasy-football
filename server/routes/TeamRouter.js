import { Router } from "express";
import { getTeams } from "../service/apiFootballService.js";

const router = Router();

// Fetch teams from API-Football for EURO 2024
router.get("/teams", async (req, res) => {
  try {
    const teams = await getTeams();
    if (teams.length === 0) {
      res.status(404).send({ error: "No teams found for EURO 2024" });
    } else {
      res.send(teams);
    }
  } catch (error) {
    res
      .status(500)
      .send({
        error: "Failed to fetch teams from API-Football",
        details: error.message,
      });
  }
});

export { router as TeamRouter };
