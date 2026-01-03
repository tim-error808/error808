import {REST_API_URI} from "./CONSTANTS";

const ModeConfig = () => {
  let apiUri;
  const mode =
    process.env.NODE_ENV === "production" ? "production" : "development";
  if (mode === "production") {
    apiUri = REST_API_URI;
  } else {
    apiUri = "http://localhost:80";
  }
  return { apiUri };
};

export default ModeConfig;
