import { useSelector } from "react-redux";
import PostDisplay from "../components/PostDisplay";
import {
  useFetchAllPostsQuery,
  useFetchLoginedUserQuery,
  useFetchUserProfileQuery,
} from "../features/apiSlice";

const LatestPost = () => {
  const { isAuthenticated } = useSelector((state) => state.authorize); // fetches authentication status

  const { data } = useFetchLoginedUserQuery(undefined, {
    skip: !isAuthenticated,
  }); // fetches id of login user

  const { data: profileData } = useFetchUserProfileQuery(data?.userId, {
    skip: !data?.userId,
  }); // fetches user profile data when id is available

  const { data: allPosts, isLoading, isError, error } = useFetchAllPostsQuery(); // fetches all posts

  return (
    <>
      {isError && <h1>{error}</h1>}
      <h2 className="text-center pb-2">Latest Posts</h2>
      {!isLoading ? (
        allPosts?.allPosts
          ?.slice()
          .reverse()
          .map((post) => {
            return (
              <PostDisplay
                post={post}
                profileData={profileData}
                isAuthenticated={isAuthenticated}
                key={post._id}
              />
            );
          })
      ) : (
        <p className="fs-5 text-center fw-normal">Loading...</p>
      )}
    </>
  );
};

export default LatestPost;
