import axios from "axios";
import ModeConfig from "../config/ModeConfig";

const { apiUri } = ModeConfig();

export default axios.create({
  baseURL: apiUri,
  withCredentials: true,
});
