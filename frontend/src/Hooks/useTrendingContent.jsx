import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

export const useTrendingContent = () => {
  const [trendingContent, settrendingContent] = useState(null);

  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/trending`);
        settrendingContent(res.data.content);
      } catch (error) {
        console.log(`Error Fetching Content`,error);
      }

    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};
