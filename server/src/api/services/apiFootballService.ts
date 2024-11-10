import axios from "axios";

const apiKey = process.env.API_FOOTBALL_KEY;
const apiUrl = "https://v3.football.api-sports.io/";

const headers = {
  "x-apisports-key": apiKey,
};

const PREMIER_LEAGUE_ID = 39;
const SEASON = 2024;

const TEAM_IDS = {
  chelsea: 49,
  manchesterUnited: 33,
  manchesterCity: 50,
  liverpool: 40,
  tottenham: 47,
  arsenal: 42,
};

export async function getPlayersFromTopTeams() {
  try {
    // Create an array of promises to fetch players for each team
    const teamPromises = Object.values(TEAM_IDS).map((teamId) =>
      axios.get(`${apiUrl}players?team=${teamId}&season=${SEASON}`, { headers })
    );

    // Await all promises to complete
    const teamResponses = await Promise.all(teamPromises);

    // Flatten the responses into a single array of players
    const allPlayers = teamResponses.flatMap(
      (response) => response.data.response
    );

    return allPlayers;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw new Error("Failed to fetch players from top teams");
  }
}
export async function getTeams() {
  const response = await axios.get(
    `${apiUrl}teams?league=${PREMIER_LEAGUE_ID}&season=${SEASON}`,

    { headers }
  );
  return response.data.response;
}

export async function getPlayers(teamId) {
  const response = await axios.get(
    `${apiUrl}players?team=${teamId}&season=${SEASON}`,

    { headers }
  );
  return response.data.response;
}

export async function getFixtures() {
  const response = await axios.get(
    `${apiUrl}fixtures?league=${PREMIER_LEAGUE_ID}&season=${SEASON}`,
    { headers }
  );
  return response.data.response;
}

export async function getStandings() {
  const response = await axios.get(
    `${apiUrl}standings?league=${PREMIER_LEAGUE_ID}&season=${SEASON}`,
    { headers }
  );
  return response.data.response;
}
