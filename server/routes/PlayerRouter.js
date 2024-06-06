import { Router } from "express";
import { getPlayers, getAllPlayers } from "../service/apiFootballService.js";

const router = Router();

/*
router.get("/players", async (req, res) => {
  const teamId = req.query.teamId;
  if (!teamId) {
    return res
      .status(400)
      .send({ error: "teamId query parameter is required" });
  }

  try {
    const players = await getPlayers(teamId);
    if (!players || players.length === 0) {
      return res
        .status(404)
        .send({ error: "No players found for the given team in EURO 2024" });
    } else {
      res.send(players);
    }
  } catch (error) {
    res.status(500).send({
      error: "Failed to fetch players from API-Football",
      details: error.message,
    });
  }
});
*/

router.get("/players", async (req, res) => {
  try {
    const allPlayers = await getAllPlayers();
    if (!allPlayers || allPlayers.length === 0) {
      return res.status(404).send({ error: "No players found for EURO 2024" });
    } else {
      res.send(allPlayers);
    }
  } catch (error) {
    res.status(500).send({
      error: "Failed to fetch all players from API-Football",
      details: error.message,
    });
  }
});

export { router as PlayerRouter };
