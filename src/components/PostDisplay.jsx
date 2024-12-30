import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import styles from "../css/postDisplay.module.css";
import moment from "moment";
import { toast } from "react-toastify";
import {
  useBookMarkPostMutation,
  useDeletePostMutation,
  useLikePostMutation,
} from "../features/apiSlice";
import { Link } from "react-router-dom";

const PostDisplay = ({ post, isAuthenticated, profileData }) => {
  const [likePost] = useLikePostMutation();
  const [bookMark] = useBookMarkPostMutation();
  const [deletePost] = useDeletePostMutation();
  const liked = profileData?.postsLiked?.includes(post._id) || false;
  const bookMarked = profileData?.bookmarks?.includes(post._id) || false;

  const likeHandler = async (postId) => {
    try {
      if (isAuthenticated) {
        await likePost({ postId, userId: profileData._id });
      } else {
        toast.warning("login first");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async (postId) => {
    try {
      if (isAuthenticated) {
        await bookMark({ postId, userId: profileData._id });
      } else {
        toast.warning("login first");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletion = async (postId) => {
    try {
      await deletePost({ userId: profileData._id, postId });
    } catch (error) {
      console.log(error);
    }
  };

  const postToDelete = profileData?.posts?.find((id) => id === post._id);

  return (
    <div className={`mx-auto py-2 my-3 bg-white ${styles.postContainer}`}>
      <div className={`d-flex align-items-start justify-content-start gap-2`}>
        <img
          src={
            post?.author?.displayPic ||
            "https://placehold.co/40x40/dodgerblue/white"
          }
          alt="profile-Image"
          className={`rounded rounded-circle img-fluid ${styles.postAuthorPic}`}
        />

        <div className={`d-flex flex-column gap-3 w-100`}>
          <div className="d-flex align-items-center gap-2">
            {/*<span className="fs-5">{post?.author?.name}</span>*/}
            <span className="text-secondary">@{post?.author?.userName}</span>
            <span className="text-secondary">
              {moment(post?.updatedAt).format("HH:mm")}
            </span>
          </div>

          <p className="fs-5 fw-medium w-100">{post?.textContent}</p>

          {post?.imgContent && (
            <img
              src={post?.imgContent}
              alt="post-image"
              className={`img-fluid rounded rounded-4 ${styles.postImg}`}
            />
          )}
        </div>
      </div>

      <div className="py-4 d-flex align-items-center justify-content-between">
        <span
          className=""
          onClick={() => likeHandler(post?._id)}
          style={{ cursor: "pointer" }}
        >
          {liked ? (
            <BsHeartFill className="text-danger fs-3" />
          ) : (
            <BsHeart className="text-danger fs-3" />
          )}
          <small className="fs-5"> {post?.likes?.length}</small>
        </span>
        {postToDelete === post._id && (
          <>
            <Link to={`/editPost/${post._id}`} state={post}>
              <span className="">
                <BsPencilSquare
                  className={`text-primary fs-3 ${styles.postIcon}`}
                />
              </span>
            </Link>
            <span className="" onClick={() => handleDeletion(postToDelete)}>
              <BsFillTrashFill
                className={`text-primary fs-3 ${styles.postIcon}`}
              />
            </span>
          </>
        )}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleBookmark(post?._id)}
        >
          {bookMarked ? (
            <BsBookmarkCheckFill className="bg-white text-primary fs-3" />
          ) : (
            <BsBookmark className="bg-white text-primary fs-3" />
          )}
        </span>
      </div>
    </div>
  );
};

export default PostDisplay;
