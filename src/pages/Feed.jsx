import { NavLink } from "react-router-dom";
import NewPost from "../components/NewPost";
import styles from "../css/feed.module.css";
import { Outlet } from "react-router-dom";

const Feed = () => {
  return (
    <>
      <NewPost />
      <nav className={`pt-5 pb-4 mx-auto ${styles.navContainer}`}>
        <ul
          className={`${styles.profileNav} ps-0 d-flex align-items-center justify-content-center`}
        >
          <li>
            <NavLink
              to={"/"}
              type="button"
              className={({ isActive }) =>
                `${styles.listItem} ${styles.leftBtn} ${
                  isActive ? styles.selectedBgColor : styles.notSelectedBgColor
                } fw-semibold`
              }
            >
              LATEST POSTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/trending"}
              type="button"
              className={({ isActive }) =>
                `${styles.listItem} ${styles.rightBtn} ${
                  isActive ? styles.selectedBgColor : styles.notSelectedBgColor
                } fw-semibold`
              }
            >
              TRENDING POSTS
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Feed;
