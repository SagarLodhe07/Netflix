import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authCheck";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const { user, logout } = userAuthStore();
  const toggle = () => setisMobileMenuOpen(!isMobileMenuOpen);

  const {setContentType } = useContentStore();


  return (
    <header className="flex max-w-6xl flex-wrap justify-between items-center h-20 mx-auto p-4">
      <div className="flex items-center gap-4 z-50">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="" className="w-32 sm:w-40" />
        </Link>
        {/* Desktop */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link to={"/"} className="hover:underline"
           onClick={() => setContentType("tv")}>
            Tv Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.userimage}
          className="h-8 w-8 cursor-pointer"
          alt="Avatar"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggle} />
        </div>
      </div>

      {/* For Moblie */}
      {isMobileMenuOpen && (
        <div className="w-full mt-4 sm:hidden border border-gray-800 rounded z-50">
          <Link
            to={"/"}
            className=" block hover:underline  p-2"
            onClick={toggle}
          >
            Moives
          </Link>
          <Link
            to={"/"}
            className=" block hover:underline  p-2"
            onClick={toggle}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="hover:underline block p-2"
            onClick={toggle}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
