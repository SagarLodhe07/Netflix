import { fetchMoviesFromTMDB } from "../Services/tmdbConfig.js";

export async function getTrendingTvs(req, res) {
  try {
    const data = await fetchMoviesFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    return res.json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getTvTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchMoviesFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    return res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    console.log(error);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
export async function getTVDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchMoviesFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    return res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.log(error);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilerTvs(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchMoviesFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similer: data.results });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
export async function getTvsByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchMoviesFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
