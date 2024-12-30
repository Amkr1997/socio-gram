import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "../components/Navbar";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import styles from "../css/home.module.css";

const Home = () => {
  return (
    <section className={`${styles.homeContainer}`}>
      <Navbar />
      <div className={`container-fluid px-4 pt-4 pb-5`}>
        <div className="row">
          <div className="col-lg-2 col-xl-2">
            <LeftNav />
          </div>
          <div className="px-0 col-12 col-md-8 col-lg-6 col-xl-7">
            <Outlet />
          </div>
          <div className="col-md-4 col-lg-4 col-xl-3">
            <RightNav />
          </div>
        </div>
      </div>
      <BottomNav />
    </section>
  );
};

export default Home;
