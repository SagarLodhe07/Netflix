import axios from "axios";
import { Config } from "../Config/envConfig.js";


export const fetchMoviesFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + Config.TMDB_API_KEY,
    },
  };
  const result = await axios.get(url, options);

  if (result.status !== 200) throw new Error("failed to fetch data from tmdb",result.statusText);
  
  return result.data;
};
