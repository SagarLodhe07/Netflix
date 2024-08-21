import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { SMALL_IMAGE_URL } from "../Utils/constant";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const HistoryPage = () => {
  const [history, sethistory] = useState([]);

  function formatted(dateString) {
    const date = new Date(dateString);

    const monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthName[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month}, ${day}, ${year}`;
  }

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        sethistory(res.data.history);
      } catch (error) {
        sethistory([]);
      }
    };
    getHistory();
  }, []);

  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      sethistory(history.filter((item) => item.id !== entry.id));
      toast.success("Item Deleted Successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to Delete Item");
    }
  };

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="font-bold text-3xl text-center"> No Search History Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-bold text-3xl text-center">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
          {history.map((entry) => (
            <div className="bg-gray-800 p-4 flex items-start rounded">
              <img
                src={SMALL_IMAGE_URL + entry.image}
                alt="History_image"
                className="size-16 mr-4 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-white text-lg">{entry.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatted(entry.createdAt)}
                </span>
              </div>
              <span
                className={` px-2 py-1 rounded-lg min-w-20 text-center text-sm ml-4 ${
                  entry.searchType === "Movie"
                    ? "bg-red-600"
                    : entry.searchType == "Tv Show"
                    ? "bg-green-600"
                    : "bg-blue-600"
                }`}
              >
                {entry.searchType}
              </span>
              <Trash
                className="size-5 hover:fill-red-600 cursor-pointer ml-4"
                onClick={() => {
                  handleDelete(entry);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
