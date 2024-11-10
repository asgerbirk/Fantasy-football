import axios from "axios";

const apiKey = process.env.API_FOOTBALL_KEY;
const apiUrl = "https://v3.football.api-sports.io/";

const headers = {
  "x-apisports-key": apiKey,
};

const PREMIER_LEAGUE_ID = 39;
const SEASON = 2024;

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
