import styles from "../css/newPost.module.css";
import { useState } from "react";
import {
  useCreatePostMutation,
  useFetchLoginedUserQuery,
} from "../features/apiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const NewPost = () => {
  const { isAuthenticated } = useSelector((state) => state.authorize);
  const { data } = useFetchLoginedUserQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [createPost] = useCreatePostMutation();
  const [content, setContent] = useState("");
  const [imagePath, setImagePath] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    try {
      if (isAuthenticated) {
        if (imagePath !== "" && content !== "") {
          formData.append("textContent", content);
          formData.append("imgContent", imagePath);
          formData.append("author", data?.userId);

          await createPost(formData);
          toast.success("Posted successfully");
        } else if (imagePath === "" && content !== "") {
          formData.append("textContent", content);
          formData.append("author", data?.userId);

          await createPost(formData);
          toast.success("Posted successfully");
        } else if (imagePath !== "" && content === "") {
          toast.warning("Add some text content also!");
        } else {
          toast.warning("Add some content!");
        }
      } else {
        toast.warning("Login First!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className={`mx-auto pb-4 d-flex align-items-start justify-content-center gap-2 ${styles.postContainer}`}
        onSubmit={handleSubmit}
      >
        <img
          src={data?.userPic || "https://placehold.co/40x40/dodgerblue/white"}
          alt="profile-Image"
          className={`rounded rounded-circle ${styles.userPic}`}
        />

        <div className="d-flex flex-column gap-3">
          <textarea
            rows={"3"}
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

export default NewPost;
