import { NavLink } from "react-router-dom";
import styles from "../css/navbar.module.css";

const Navbar = () => {
  return (
    <>
      <header className={`container ${styles.headerContainer}`}>
        <NavLink className={`${styles.navBrand}`} to={"/"}>
          <p
            className={`${styles.logo} fs-5 fw-medium border border-0 text-light mb-0 text-dark rounded-4 px-5 d-flex align-items-center`}
          >
            socio
            <span className={`${styles.logoHalf} fs-4 fw-bold`}>Gram</span>
          </p>
        </NavLink>
      </header>
    </>
  );
};

export default Navbar;
