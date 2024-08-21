import { userAuthStore } from "../store/authCheck";
import Auth from "./Auth";
import Homescreen from "./Homescreen";

const Home = () => {
  const { user } = userAuthStore();
  return <div>{user ? <Homescreen /> : <Auth />}</div>;
};

export default Home;
