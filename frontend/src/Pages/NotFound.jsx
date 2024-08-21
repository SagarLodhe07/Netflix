import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white relative"
      style={{ background: `url(/404.png)` ,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <header className="bg-black left-0 top-0 absolute p-4 w-full">
        <Link to={"/"}>
          <img src={"/netflix-logo.png"} alt="Netflix" className="h-8" />
        </Link>
      </header>
      <main className="text-center error-page--content z-10">
        <h1 className="text-7xl font-semibold mb-4">Lost your way?</h1>
        <p className="text-xl mb-6">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>

        <Link
          to={"/"}
          className="bg-gray-200 text-black text-md font-semibold py-2 px-4 rounded-lg"
        >
          Netflix Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
