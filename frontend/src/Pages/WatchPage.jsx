import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../Component/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORGINAL_IMAGE_URL, SMALL_IMAGE_URL } from "../Utils/constant";
import { formattedReleasedate } from "../Utils/dateFunction";
import WatchPageSekeleton from "../Component/WatchPageSekeleton";

const WatchPage = () => {
  const { id } = useParams();
  // console.log(id);
  const [currentTrailerIdx, setcurrentTrailerIdx] = useState(0);
  const [trailers, settrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setcontent] = useState({});
  const { contentType } = useContentStore();
  const [similers, setsimilers] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        settrailers(res.data.trailers);
        // console.log(trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          settrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similers`);
        setsimilers(res.data.similer);
        console.log("Similers ", similers);
      } catch (error) {
        if (error.message.includes("404")) {
          setsimilers([]);
        }
      }
    };
    getSimilers();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setcontent(res.data.content);
        console.log("Details", content);
      } catch (error) {
        if (error.message.includes("404")) {
          setcontent(null);
        }
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setcurrentTrailerIdx(currentTrailerIdx + 1);
  };
  const handlePrev = () => {
    if (currentTrailerIdx > 0) setcurrentTrailerIdx(currentTrailerIdx - 1);
  };
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  // if(loading){
  //   return (
  //     <div className="min-h-screen bg-black p-10">
  //       <WatchPageSekeleton/>
  //     </div>

  //   )
  // }
  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar/>
          <div className=" text-center mt-40 mx-auto px-4 py-8 h-full">
            <h3 className="text-2xl font-bold sm:text-5xl text-balance">No Content Found</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container h-full px-4 py-8 mx-auto">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex justify-between items-center">
            <button
              className={`bg-gray-500/50 p-3 hover:bg-gray-500/70 rounded-full ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/50 p-3 hover:bg-gray-500/70 rounded-full ${
                currentTrailerIdx === trailers.length - 1
                  ? " opacity-50  cursor-not-allowed"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              width={"100%"}
              height={"70vh"}
              controls={true}
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="text-red-500 font-bold">
                {content?.name || content?.title}
              </span>
            </h2>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto justify-between gap-20">
          <div className="mb-4 md:mb-0">
            <h2 className="text-4xl font-bold text-balance">
              {" "}
              {content?.name || content?.title}
            </h2>
            <p>
              {formattedReleasedate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG 13</span>
              )}
            </p>
            <p className="mt-2">{content?.overview}</p>
          </div>
          <img
            src={ORGINAL_IMAGE_URL + content?.poster_path}
            alt=""
            className="max-h-[600px] rounded-md"
          />
        </div>

        {similers.length > 0 && (
          <div className="max-w-6xl mt-12 mx-auto relative">
            <h3 className="text-3xl font-bold mb-3">
              Similers Moives / Tv Shows
            </h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group "
              ref={sliderRef}
            >
              {similers.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    className="w-52 flex-none"
                    to={`/watch/${content.id}`}
                  >
                    <img
                      src={SMALL_IMAGE_URL + content.poster_path}
                      alt=""
                      className="w-full h-80 rounded-md"
                    />
                    <h4 className="text-center mt-2">
                      {content.name || content.title}
                    </h4>
                  </Link>
                );
              })}
              <ChevronRight
                onClick={scrollRight}
                className="w-8 h-8 top-1/2 -translate-y-1/2 rounded-full  absolute right-2 opacity-0 group-hover:opacity-100  duration-300 bg-red-600/70 transition-all cursor-pointer text-white "
              />
              <ChevronLeft
                onClick={scrollLeft}
                className="w-8 h-8 top-1/2 -translate-y-1/2 rounded-full  absolute left-2 opacity-0 group-hover:opacity-100  duration-300 bg-red-600/70 transition-all cursor-pointer text-white "
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
