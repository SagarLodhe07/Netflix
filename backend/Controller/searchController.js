import { User } from "../Models/usermodel.js";
import { fetchMoviesFromTMDB } from "../Services/tmdbConfig.js";

async function addSearchHistory(userId, searchItem) {
  // Check if the entry already exists in the user's search history
  const user = await User.findById(userId);
  const existingHistory = user.searchHistory.find(item => item.id === searchItem.id);

  if (existingHistory) {
    return; // Skip adding if the entry already exists
  }

  // Add the new search item to the history
  await User.findByIdAndUpdate(userId, {
    $push: { searchHistory: searchItem }
  });
}

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchMoviesFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length == 0) {
      return res.status(404).send("Nothing Found");
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "Person",
          createdAt: new Date(),
        },
      },
    });
    return res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    // console.log("Error in searchperson controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchMoviesFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length == 0) {
      return res.status(404).send("Nothing Found");
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "Movie",
          createdAt: new Date(),
        },
      },
    });
    return res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    // console.log("Error in searchMovie Controller", error.message);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchMoviesFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length == 0) {
      return res.status(404).send("Nothing Found");
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "Tv Show",
          createdAt: new Date(),
        },
      },
    });
    return res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    // console.log("Error in searchTv Controller", error.message);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    return res
      .status(200)
      .json({ success: true, history: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
export async function deleteSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id)
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    return res
      .status(200)
      .json({ success: true, message:'History deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
