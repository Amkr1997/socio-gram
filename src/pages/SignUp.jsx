import styles from "../css/signUp.module.css";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../features/apiSlice";

const SignUp = () => {
  const [registerUser] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    passConfirm: "",
  });
  const [checkTerms, setCheckTerms] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkHandler = (e) => {
    const { checked } = e.target;

    setCheckTerms(checked);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        checkTerms &&
        formData.fullName !== "" &&
        formData.userName !== "" &&
        formData.email !== "" &&
        formData.password !== "" &&
        formData.passConfirm !== "" &&
        formData.password === formData.passConfirm
      ) {
        const response = await registerUser({
          name: formData.fullName,
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
        }).unwrap();

        toast.success(response);

        setFormData({
          fullName: "",
          userName: "",
          email: "",
          password: "",
          passConfirm: "",
        });

        setCheckTerms(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <section className={`${styles.formContainer} container px-4 px-sm-0`}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 bg-white px-4 pt-4 pb-2 rounded rounded-3">
            <form onSubmit={submitHandler}>
              <h1 className="text-center m-0 pb-3 fs-2 fw-bold">
                Sign<span className={`${styles.logoHalf}`}>Up</span>
              </h1>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={changeHandler}
                  placeholder="Enter Fullname"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  className="form-control"
                  onChange={changeHandler}
                  placeholder="Enter Username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="form-control"
                  onChange={changeHandler}
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
                  value={formData.password}
                  className="form-control"
                  onChange={changeHandler}
                  placeholder="Enter password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="passConfirm"
                  className="form-control"
                  value={formData.passConfirm}
                  onChange={changeHandler}
                  placeholder="Enter password again"
                />
              </div>
              <div className="form-check pt-2 pb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={checkTerms === true}
                  onChange={checkHandler}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I accept all terms and conditions
                </label>
              </div>
              <button
                type="submit"
                className={`${styles.signUpBtn} w-100 fw-bold`}
              >
                SIGN UP
              </button>
            </form>
            <span className={`${styles.loginRoute} py-3`}>
              Already have an account,{" "}
              <Link to={"/login"} className={`${styles.loginRouteHalf}`}>
                LOGIN
              </Link>
            </span>
          </div>
          <div className="col-md-3"></div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
