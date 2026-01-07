//TODO: document the function
const GamesModel = require("../models/GamesModel");

const BoardGameController = async (req, res) => {
  const filters = Array.isArray(req.query.filter)
    ? req.query.filter
    : req.query.filter
    ? [req.query.filter]
    : [];
  const difficultyMap = { easy: 1, medium: 2, hard: 3 };
  const playersMap = {
    2: [2],
    "3-4": [3, 4],
    "4plus": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  };
  const difficulty = filters
    .map((f) => difficultyMap[f])
    .filter((d) => d !== undefined);
  const maxPlayers = filters.flatMap((f) => playersMap[f] || []);
  let query = {};
  if (difficulty.length > 0) {
    query.difficulty = { $in: difficulty };
  }
  if (maxPlayers.length > 0) {
    query.maxPlayers = { $in: maxPlayers };
  }
  let games = await GamesModel.find(query).lean();
  if (req.query.search) {
    games = games.filter((game) =>
      game.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }
  return res.status(200).json(games);
};

module.exports = BoardGameController;
