import axios from "axios";

const apiKey = process.env.API_FOOTBALL_KEY;
const apiUrl = "https://v3.football.api-sports.io/";

const headers = {
  "x-apisports-key": apiKey,
};

const EURO_2024_LEAGUE_ID = 4;

export async function getTeams() {
  const response = await axios.get(
    `${apiUrl}teams?league=${EURO_2024_LEAGUE_ID}&season=2024`,
    { headers }
  );
  return response.data.response;
}

export async function getPlayers(teamId) {
  const response = await axios.get(
    `${apiUrl}players?team=${teamId}&season=2024`,
    { headers }
  );
  return response.data.response;
}

export async function getAllPlayers() {
  try {
    const teams = await getTeams();
    let allPlayers = [];

    for (const team of teams) {
      const players = await getPlayers(team.team.id);
      allPlayers = allPlayers.concat(players);
    }

    return allPlayers;
  } catch (error) {
    throw new Error(`Failed to fetch players: ${error.message}`);
  }
}

export async function getFixtures() {
  const response = await axios.get(
    `${apiUrl}fixtures?league=${EURO_2024_LEAGUE_ID}&season=2024`,
    { headers }
  );
  return response.data.response;
}

export async function getStandings() {
  const response = await axios.get(
    `${apiUrl}standings?league=${EURO_2024_LEAGUE_ID}&season=2024`,
    { headers }
  );
  return response.data.response;
}
