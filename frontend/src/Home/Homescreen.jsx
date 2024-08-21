import { Info, Play } from "lucide-react";
import Navbar from "../Component/Navbar";
import { Link } from "react-router-dom";
import { useTrendingContent } from "../Hooks/useTrendingContent";
import {
  MOVIE_CATEGORIES,
  ORGINAL_IMAGE_URL,
  TV_CATEGORIES,
} from "../Utils/constant";
import { useContentStore } from "../store/content";
import MovieSlider from "../Component/MovieSlider";
import { useState } from "react";
const Homescreen = () => {
  const { trendingContent } = useTrendingContent();
  const { contentType } = useContentStore();
  // console.log(`Trending Content`, trendingContent);
  const [isImageLoding, setisImageLoding] = useState(true);

  return (
    <>
      <div className="h-screen text-white relative ">
        <Navbar />

        {isImageLoding && (
          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-black/70 -z-10 shimmer" />
        )}
        <img
          src={ORGINAL_IMAGE_URL + trendingContent?.backdrop_path}
          className="object-cover w-full -z-50 h-full absolute top-0 left-0"
          alt="hero img"
          onLoad={() => {
            setisImageLoding(false);
          }}
        />

        <div
          className="absolute bg-black/50 top-0  w-full h-full left-0"
          aria-hidden="true"
        />
        <div className=" absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-50" />

          <div className="max-w-2xl">
            <h1 className="font-extrabold  text-6xl mt-4 text-balance">
              {trendingContent?.original_title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-2xl">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-3 text-lg">{trendingContent?.overview}</p>
          </div>

          <div className="flex gap-4 mt-8">
            <Link
              to={`watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black px-4 py-2  mr-4 rounded-md flex items-center font-bold"
            >
              <Play className="size-6 fill-black inline-block mr-2 cursor-pointer" />
              Play
            </Link>
            <Link
              to={`watch/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 mr-4 rounded-md flex items-center font-bold"
            >
              <Info className="size-6  inline-block mr-2 cursor-pointer" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 py-10 bg-black">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default Homescreen;
