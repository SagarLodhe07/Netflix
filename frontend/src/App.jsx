import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Home/Home";
import Footer from "./Component/Footer";
import { Toaster } from "react-hot-toast";
import { userAuthStore } from "./store/authCheck";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./Pages/WatchPage";
import SearchPages from "./Pages/SearchPages";
import HistoryPage from "./Pages/HistoryPage";
import NotFound from "./Pages/NotFound";

function App() {
  const { user, isCheckingAuth, authCheck } = userAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);
  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPages /> : <Navigate to={"/"} />}
        />
        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/*"
          element={<NotFound />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
