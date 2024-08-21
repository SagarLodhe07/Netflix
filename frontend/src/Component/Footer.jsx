import React from "react";
// import { Githubimg ,Youtubeimg} from "lucide-react";
import { Youtube, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black md:px-8 md:py-2 text-white py-6 border-t border-gray-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center leading-loose">
          Built By Sagar Lodhe
          <a
            href="https://github.com/SagarLodhe07"
            rel="noopener noreferrer"
            target="_blank"
            className="inline-block ml-2"
          >
            <Github />
          </a>
          <a
            href="https://www.youtube.com/@SagarKumar-yq9cg"
            rel="noopener noreferrer"
            target="_blank"
            className="inline-block ml-2"
          >
            <Youtube />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
