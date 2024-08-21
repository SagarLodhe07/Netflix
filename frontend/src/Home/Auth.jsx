import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Auth = () => {
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };
  return (
    <div className="hero-bg relative">
      <header className="max-w-6xl mx-auto flex items-center p-4 justify-between pb-20">
        <img src="/netflix-logo.png" alt="logo" className="w-32 md:w-52" />
        <Link to={"/login"} className="text-white bg-red-700 py-1 px-3 rounded">
          Login
        </Link>
      </header>
      <div className="flex flex-col items-center justify-center  text-center py-40 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV show, and more
        </h1>
        <p className="text-lg mb-1">Watch anywhere, Cancel anytime</p>
        <p> Ready to watch? Enter your email to create or start membership</p>
        <form
          className="flex flex-col md:flex-row w-1/2 mt-5 gap-4"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            className="bg-black/60 text-gray-300 rounded flex-1 p-2  border-gray-600"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <button className="bg-red-600 rounded text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 flex justify-center items-center">
            Get started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>
      {/* Separater */}
      <div className="h-2 w-full bg-slate-800" aria-hidden="true" />
      {/* 1st section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto  justify-center items-center md:flex-row flex-col px-4 md:px-2">
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
          </div>
          {/* Right */}
          <div className="flex-1 relative">
            {/* Tv Part */}
            <img src="/tv.png" alt="" className="mt-4 z-20 relative " />
            <video
              className=" top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              autoPlay={true}
              playsInline
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
            {/* *********************** */}
          </div>
        </div>
      </div>

      {/* Separater */}
      <div className="h-2 w-full bg-slate-800" aria-hidden="true" />
      {/* 2nd section */}

      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto  justify-center items-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* Left */}
          <div className="flex-1">
            <div className="relative">
              <img src="/stranger-things-lg.png" alt="strangerLg" />
              <div className="flex items-center absolute  bottom-5 -translate-x-1/2 left-1/2 gap-2 bg-black w-3/4 lg:w-1/2 h-20 border border-slate-500 rounded-md px-2">
                <img src="stranger-things-sm.png" className="h-full" alt="" />
                <div className=" flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      {" "}
                      Stranger Things
                    </span>
                    <span className="text-blue-500 text-sm">
                      {" "}
                      Downloading...
                    </span>
                  </div>
                  <img src="/download-icon.gif" className="h-12" alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favourites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* Separater */}
      <div className="h-2 w-full bg-slate-800" aria-hidden="true" />
      {/* 3rd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto  justify-center items-center md:flex-row flex-col px-4 md:px-2">
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          {/* Right */}
          <div className="flex-1 relative overflow-hidden">
            {/* Computer */}
            <img
              src="/device-pile.png"
              alt=""
              className="mt-4 z-20 relative "
            />
            <video
              className=" top-2 left-1/2 absolute -translate-x-1/2 h-4/6 z-10 max-w-[63%]"
              autoPlay={true}
              playsInline
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
            {/* *********************** */}
          </div>
        </div>
      </div>

      {/* Separater */}
      <div className="h-2 w-full bg-slate-800" aria-hidden="true" />
      {/* 4th section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto  justify-center items-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* Left */}
          <div className="flex-1">
            <div className="relative">
              <img src="/kids.png" alt="strangerLg" />
            </div>
          </div>
          {/* Right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send children on adventures with their favourite characters in a
              space made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
