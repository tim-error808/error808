const ModeConfig = () => {
  let apiUri;
  const mode =
    process.env.NODE_ENV === "production" ? "production" : "development";
  if (mode === "production") {
    apiUri = "https://backend.err808.xyz";
  } else {
    apiUri = "http://localhost:80";
  }
  return { apiUri };
};

export default ModeConfig;
