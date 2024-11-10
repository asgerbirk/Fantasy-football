// src/api/routes/PlayerRoutes.ts
import express from "express";
import { getPlayersFromTopTeams } from "../services/apiFootballService.js";

const router = express.Router();

// Define the route to get all players from top teams
router.get("/top-teams", async (req, res) => {
  try {
    const players = await getPlayersFromTopTeams();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch players from top teams" });
  }
});

export { router as PlayerRouter };
