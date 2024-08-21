import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMAGE_URL } from "../Utils/constant";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrow] = useState(false);
  const sliderRef = useRef(null);

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

  useEffect(() => {
    const GetContent = async () => {
      const result = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(result.data.content);
    };
    GetContent();
  }, [contentType, category]);

  const formattedCategoryType =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Moives" : "Tv Shows";
  return (
    <div
      className="text-white  relative px-5 md:px-20 bg-black"
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryType} {formattedContentType}
      </h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMAGE_URL + item.backdrop_path}
                alt=""
                className="transition-transform duration-300 ease-in-out  group-hover:scale-125"
              />
            </div>
            <p className="text-center mt-2">{item?.title || item?.name}</p>
          </Link>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 bg-black/50 rounded-full -translate-y-1/2 left-5 flex justify-center items-center size-12 md:left-20 hover:bg-black/70 z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 bg-black/50 rounded-full -translate-y-1/2 right-5 flex justify-center items-center size-12 md:right-20 hover:bg-black/70 z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
