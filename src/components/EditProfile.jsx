import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "../css/editProfile.module.css";
import { useUpdateUserProfileMutation } from "../features/apiSlice";
import BottomNav from "./BottomNav";

const EditProfile = () => {
  const { completeProfileData } = useOutletContext();
  const [updateUser] = useUpdateUserProfileMutation();
  const navigate = useNavigate();
  const avatarUrl = completeProfileData?.profileData?.displayPic;

  const avatarsList = [
    "https://res.cloudinary.com/dj3aicone/image/upload/v1733947673/54b19ada-d53e-4ee9-8882-9dfed1bf1396_nofgmj.jpg",
    "https://res.cloudinary.com/dj3aicone/image/upload/v1733947592/bc666226-d3cf-43ef-91dd-47c2b21d3eec_jx0cba.jpg",
    "https://res.cloudinary.com/dj3aicone/image/upload/v1733947533/smiling-young-man-illustration_1308-175961_dwjv5k.avif",
    "https://res.cloudinary.com/dj3aicone/image/upload/v1733947533/woman-floral-traditional-costume_1308-176159_m2sqse.avif",
    "https://res.cloudinary.com/dj3aicone/image/upload/v1733947532/woman-with-braided-hair-illustration_1308-174675_xmsydd.jpg",
  ];

  const [name, setName] = useState(
    completeProfileData?.profileData?.name || ""
  );
  const [email, setEmail] = useState(
    completeProfileData?.profileData?.email || ""
  );
  const [userName, setUserName] = useState(
    completeProfileData?.profileData?.userName || ""
  );
  const [bio, setBio] = useState(completeProfileData?.profileData?.bio || "");
  const [displayPicPath, setdisplayPicPath] = useState(
    completeProfileData?.profileData?.displayPic || ""
  );
  const [websiteLink, setWebsiteLink] = useState(
    completeProfileData?.profileData?.websiteLink || ""
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        name !== "" &&
        email !== "" &&
        userName !== "" &&
        bio !== "" &&
        displayPicPath !== "" &&
        websiteLink !== ""
      ) {
        await updateUser({
          name,
          email,
          userName,
          bio,
          displayPic: displayPicPath,
          websiteLink,
          _id: completeProfileData?.profileData?._id,
        });

        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center">Edit Profile</h1>
      <form onSubmit={submitHandler}>
        <div className="my-3">
          <label className="form-label">
            <h4 className="m-0">Name </h4>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="my-3">
          <label className="form-label">
            <h4 className="m-0">Email </h4>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="my-3">
          <label className="form-label">
            <h4 className="m-0">Username </h4>
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="my-3">
          <label className="form-label">
            <h4 className="m-0">Bio </h4>
          </label>
          <textarea
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="form-control"
            rows={"5"}
            cols={"40"}
          ></textarea>
        </div>

        <div className="my-3">
          <label className="form-label">
            <h4 className="m-0">
              Display Pic{" "}
              <span className="fs-5 text-primary">(Choose from Avatars)</span>
            </h4>
          </label>
          <div className="d-flex align-items-center justify-content-around py-2">
            {avatarsList.map((avatar, index) => {
              return (
                <img
                  src={avatar}
                  alt="avatar"
                  className={`img-fluid rounded-circle  ${styles.avatar} ${
                    avatarUrl === avatar
                      ? styles.selectedAvatar
                      : styles.notSelectedAvatar
                  } `}
                  key={index}
                  onClick={() => setdisplayPicPath(avatar)}
                />
              );
            })}
          </div>
        </div>

        <div className="my-3">
          <label className="form-label">
            <h4 className="m-0">Website Link</h4>
          </label>
          <input
            type="text"
            value={websiteLink}
            onChange={(e) => setWebsiteLink(e.target.value)}
            className="form-control"
          />
        </div>

        <button
          className={`btn btn-danger w-100 rounded-pill ${styles.submitBtn}`}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EditProfile;
