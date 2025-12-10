const ModeConfig = () => {
  let apiUri;
  const mode =
    process.env.NODE_ENV === "production" ? "production" : "development";
  if (mode === "production") {
    apiUri =
      "https://error808-backend-ftcqdmg7fqcsf0gp.westeurope-01.azurewebsites.net";
  } else {
    apiUri = "http://localhost:80";
  }
  return { apiUri };
};

export default ModeConfig;
