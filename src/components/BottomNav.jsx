import styles from "../css/bottomNav.module.css";
import { Link } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { BsRocket } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";

const BottomNav = () => {
  return (
    <section className={`${styles.bottomNavContainer} py-4`}>
      <div className={`${styles.navigate}`}>
        <div className={`${styles.home} d-flex align-items-center gap-2`}>
          <Link to={"/"} className={`${styles.navLink}`}>
            <span className="d-flex align-items-center justify-content-center">
              <BsHouse className={`fs-5 ${styles.icon}`} />
            </span>
            {""}
          </Link>
        </div>

        <div className={`${styles.home} d-flex align-items-center gap-2`}>
          <Link to={"/explore"} className={`${styles.navLink}`}>
            <span className="d-flex align-items-center justify-content-center">
              <BsRocket className={`fs-5 ${styles.icon}`} />
            </span>
            {""}
          </Link>
        </div>

        <div className={`${styles.home} d-flex align-items-center gap-2`}>
          <Link to={"/bookmarks"} className={`${styles.navLink}`}>
            <span className="d-flex align-items-center justify-content-center">
              <BsBookmark className={`fs-5 ${styles.icon}`} />
            </span>
            {""}
          </Link>
        </div>

        <div className={`${styles.home} d-flex align-items-center gap-2`}>
          <Link to={"/profile"} className={`${styles.navLink}`}>
            <span className="d-flex align-items-center justify-content-center">
              <BsPersonFill className={`fs-4 ${styles.icon}`} />
            </span>
            {""}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BottomNav;
