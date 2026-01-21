describe("listingsController filters", () => {
  const listingsController =
    require("../../controllers/listingsController").listingsController;
  const ListingsModel = require("../../models/ListingsModel");
  jest.mock("../../models/ListingsModel");

  const mockListings = [
    {
      name: "Easy Game",
      difficulty: 1,
      maxPlayers: 2,
      user: { name: "User1" },
    },
    {
      name: "Medium Party Game",
      difficulty: 2,
      maxPlayers: 4,
      user: { name: "User2" },
    },
    {
      name: "Hard Strategy Game",
      difficulty: 4,
      maxPlayers: 6,
      user: { name: "User3" },
    },
  ];

  let req, res;

  beforeEach(() => {
    req = { query: {}, user: { _id: "user123" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    ListingsModel.find.mockImplementation((query) => {
      // Simulate DB filtering for more realistic tests
      let filtered = mockListings;
      if (query && query.difficulty) {
        filtered = filtered.filter((l) =>
          query.difficulty.$in.includes(l.difficulty),
        );
      }
      if (query && query.maxPlayers) {
        filtered = filtered.filter((l) =>
          query.maxPlayers.$in.includes(l.maxPlayers),
        );
      }
      if (query && query.user && query.user.$ne) {
        filtered = filtered.filter((l) => l.user.name !== "user123");
      }
      return {
        populate: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(filtered),
        }),
      };
    });
  });

  afterEach(() => jest.clearAllMocks());

  it("filters by difficulty", async () => {
    req.query.filter = "easy";
    await listingsController(req, res);
    expect(ListingsModel.find).toHaveBeenCalledWith({
      available: true,
      difficulty: { $in: [1] },
      user: { $ne: "user123" },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({ name: "Easy Game" }),
    ]);
  });

  it("filters by maxPlayers", async () => {
    req.query.filter = "3-4";
    await listingsController(req, res);
    expect(ListingsModel.find).toHaveBeenCalledWith({
      available: true,
      maxPlayers: { $in: [3, 4] },
      user: { $ne: "user123" },
    });
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({ name: "Medium Party Game" }),
    ]);
  });

  it("filters by difficulty AND maxPlayers", async () => {
    req.query.filter = ["hard", "4plus"];
    await listingsController(req, res);
    expect(ListingsModel.find).toHaveBeenCalledWith({
      available: true,
      difficulty: { $in: [4, 5] },
      maxPlayers: { $in: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
      user: { $ne: "user123" },
    });
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({ name: "Hard Strategy Game" }),
    ]);
  });

  it("filters by search query", async () => {
    req.query.search = "party";
    await listingsController(req, res);
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({ name: "Medium Party Game" }),
    ]);
  });

  it("filters by search query (case sensitivity)", async () => {
    req.query.search = "PARTY";
    await listingsController(req, res);
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({ name: "Medium Party Game" }),
    ]);
  });

  it("filters by search query (unlisted game)", async () => {
    req.query.search = "Nonexistent";
    await listingsController(req, res);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("returns all listings when no filters are provided", async () => {
    await listingsController(req, res);
    expect(ListingsModel.find).toHaveBeenCalledWith({
      available: true,
      user: { $ne: "user123" },
    });
    expect(res.json).toHaveBeenCalledWith(mockListings);
  });
});
