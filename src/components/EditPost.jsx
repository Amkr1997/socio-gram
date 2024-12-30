import { useSelector } from "react-redux";
import { useState } from "react";
import { useEditPostMutation } from "../features/apiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../css/editPost.module.css";

const EditPost = () => {
  const { state } = useLocation();
  const [content, setContent] = useState(state?.textContent || "");
  const [imagePath, setImagePath] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.authorize);
  const [updatePost] = useEditPostMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    try {
      if (isAuthenticated) {
        formData.append("_id", state._id);

        if (imagePath && content !== "") {
          formData.append("textContent", content);
          formData.append("imgContent", imagePath);
          await updatePost(formData);

          toast.success("Post updated successfully");
        } else if (!imagePath && content !== "") {
          formData.append("textContent", content);
          await updatePost(formData);

          toast.success("Post updated successfully");
        } else if (imagePath && content === "") {
          formData.append("imgContent", imagePath);
          await updatePost(formData);

          toast.success("Post updated successfully");
        } else {
          toast.warning("Add some content!");
        }
      } else {
        toast.warning("Login First!");
      }
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  };

  console.log(state);

  return (
    <>
      <h2 className="text-center text-uppercase">
        edit your <span className="text-primary">post</span>
      </h2>
      <form
        className={`mx-auto bg-white mt-5 pb-4 d-flex align-items-start justify-content-center gap-2 ${styles.postContainer}`}
        onSubmit={handleSubmit}
      >
        <img
          src={
            state?.author?.displayPic ||
            "https://placehold.co/40x40/dodgerblue/white"
          }
          alt="profile-Image"
          className={`rounded rounded-circle ${styles.authorPic}`}
        />

        <div className="d-flex flex-column gap-3">
          <textarea
            rows={"5"}
            cols={"60"}
            className={`${styles.postInput}`}
            placeholder="Post something"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div
            className={`${styles.postBtns} d-flex align-items-start justify-content-between`}
          >
            <div className={`${styles.uploadIcons} input-group-sm`}>
              <input
                type="file"
                className="form-control w-75"
                onChange={(e) => setImagePath(e.target.files[0])}
              />
            </div>
            <button className={`${styles.postBtn}`}>POST</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditPost;
