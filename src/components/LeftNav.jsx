import { Link } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { BsRocket } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import styles from "../css/leftNav.module.css";

const LeftNav = () => {
  return (
    <>
      <div className={`${styles.leftNav}`}>
        <div className="navLogos d-flex flex-column gap-2 mb-4">
          <div className={`${styles.home} d-flex align-items-center gap-2`}>
            <span className="d-flex align-items-center justify-content-center">
              <BsHouse className={`fs-5`} />
            </span>
            {""}
            <Link to={"/"} className={`${styles.navLink}`}>
              <span className="fs-4 fw-bold text-dark">Home</span>
            </Link>
          </div>

          <div className={`${styles.home} d-flex align-items-center gap-2`}>
            <span className="d-flex align-items-center justify-content-center">
              <BsRocket className={`fs-5`} />
            </span>
            {""}
            <Link to={"/explore"} className={`${styles.navLink}`}>
              <span className="fs-4 fw-medium text-dark">Explore</span>
            </Link>
          </div>

          <div className={`${styles.home} d-flex align-items-center gap-2`}>
            <span className="d-flex align-items-center justify-content-center">
              <BsBookmark className={`fs-5`} />
            </span>
            {""}
            <Link to={"/bookmarks"} className={`${styles.navLink}`}>
              <span className="fs-4 fw-medium text-dark">Bookmarks</span>
            </Link>
          </div>

          <div className={`${styles.home} d-flex align-items-center gap-2`}>
            <span className="d-flex align-items-center justify-content-center">
              <BsPersonFill className="fs-4" />
            </span>
            {""}
            <Link to={"/profile"} className={`${styles.navLink}`}>
              <span className="fs-4 fw-medium text-dark">Profile</span>
            </Link>
          </div>
        </div>
        {/*<Link
          to={"#"}
          className={`${styles.createBtn} d-flex align-items-center gap-2`}
        >
          <BsFillPlusCircleFill className="bg-transparent" />
          New Post
        </Link>*/}
      </div>
    </>
  );
};

export default LeftNav;
