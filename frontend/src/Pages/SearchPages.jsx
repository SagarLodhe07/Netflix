import { useState } from "react";
import Navbar from "../Component/Navbar";
import { useContentStore } from "../store/content";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORGINAL_IMAGE_URL } from "../Utils/constant";

const SearchPages = () => {
  const [activeTab, setactiveTab] = useState("movie");
  const [results, setresults] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const { setContentType } = useContentStore();

  const handleTab = (tab) => {
    setactiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setresults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setresults(res.data.data);
    } catch (error) {
      toast.error("Not Found");
    }
  };
  console.log("Result", results);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-600"
            } hover:bg-red-700`}
            onClick={() => handleTab("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-600"
            } hover:bg-red-700`}
            onClick={() => handleTab("tv")}
          >
            Tv Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-600"
            } hover:bg-red-700`}
            onClick={() => handleTab("person")}
          >
            Person
          </button>
        </div>
        <form
          onSubmit={handleSearch}
          className="flex  gap-2 mx-auto items-stretch max-w-2xl mb-8"
        >
          <input
            type="text"
            placeholder={"Search for " + activeTab}
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            className="w-full p-2 rounded text-white bg-gray-500/50"
          />
          <button className="bg-red-600 hover:bg-red-700 p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;
            return (
              <div key={results.id} className="bg-gray-800 p-4 rounded">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img src={ORGINAL_IMAGE_URL + result.profile_path} alt={result.name}
                    className="max-h-96 rounded mx-auto" />
                    <h2 className="text-xl font-bold mt-2">{result.name}</h2>
                  </div>
                ):(
                  <Link to={'/watch/' + result.id}
                  onClick={()=>setContentType(activeTab)}>
                    <img src={ORGINAL_IMAGE_URL + result.poster_path} alt={result?.title|| result?.name}
                     className="w-full h-auto rounded" 
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPages;
