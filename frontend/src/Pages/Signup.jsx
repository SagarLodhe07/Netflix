import { useState } from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authCheck";

const Signup = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

  const { signup, isSigningup } = userAuthStore();
  const handleSignup = (e) => {
    e.preventDefault();
    // console.log(email, password, username);
    signup({ email, username, password });
  };
  return (
    <div className="h-screen w-full hero-bg">
      <header className="flex items-center justify-between p-4 max-w-6xl mx-auto">
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="" className="w-52" />
        </Link>
      </header>
      <div className="flex items-center justify-center mt-20 mx-3">
        <div className="w-full max-w-md  bg-black/60 p-8 space-y-6 shadow-md rounded-md">
          <h1 className="text-white font-bold text-2xl text-center mb-4">
            Sign up
          </h1>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="text-sm text-gray-300 block">
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className=" w-full px-3 py-2 rounded-md border bg-transparent border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="text-sm text-gray-300 block">
                Username
              </label>

              <input
                type="text"
                id="username"
                placeholder="Jon Doe"
                className=" w-full px-3 py-2 rounded-md border bg-transparent border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-300 block">
                Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="*****"
                className=" w-full px-3 py-2 rounded-md border bg-transparent border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-red-600 py-2 font-semibold text-white rounded-md hover:bg-red-700"
            disabled={isSigningup}>
              {isSigningup ? "Loading" : "Sign Up"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
