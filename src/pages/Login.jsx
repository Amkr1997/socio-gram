import Navbar from "../components/Navbar";
import styles from "../css/login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { loginUserReducer } from "../features/authorizeSlice";

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== "" && formData.email !== "") {
        const response = await loginUser(formData);

        dispatch(loginUserReducer(response?.data));
        toast.success("login successfully");

        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <section
        className={`${styles.formContainer} container px-5 px-sm-0 mt-5`}
      >
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 bg-white px-4 pt-4 pb-2 rounded rounded-3">
            <form onSubmit={submitHandler}>
              <h1 className="text-center m-0 pb-3 fs-2 fw-bold">
                Log<span className={`${styles.logoHalf}`}>In</span>
              </h1>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="form-control"
                  placeholder="Enter email address"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                className={`${styles.loginBtn} mt-4 mb-2 w-100 fw-bold`}
              >
                LOGIN
              </button>
            </form>
            <span className={`${styles.signUpRoute} py-3`}>
              New User,{" "}
              <Link to={"/signup"} className={`${styles.signUpRouteHalf}`}>
                SignUp
              </Link>
            </span>
          </div>
          <div className="col-md-3"></div>
        </div>
      </section>
    </>
  );
};

export default Login;
