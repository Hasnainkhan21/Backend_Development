const fetch = require('node-fetch');

const clientId = "e3d75cd95dde4b479a3ec88794fc5b35";
const clientSecret = "0d29fdb779e34c269f7157dab916b395";

module.exports.getSpotifyToken = async (req, res) => {
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authString}`,
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    res.json({ access_token: data.access_token });
  } catch (err) {
    console.error("Error fetching Spotify token:", err);
    res.status(500).json({ error: "Failed to get token" });
  }
};

module.exports.searchSpotifyTracks = async (req, res) => {
  const query = req.params.query;

  try {
    // Get token from internal route
    const tokenResponse = await fetch("http://localhost:3000/api/v0/users/spotify/token");
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch from Spotify API
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    console.log("Search result:", data);
    res.json(data);
  } catch (err) {
    console.error("Error searching Spotify:", err);
    res.status(500).json({ error: "Search failed" });
  }
};