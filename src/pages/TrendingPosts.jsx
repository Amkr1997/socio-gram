import { useSelector } from "react-redux";
import PostDisplay from "../components/PostDisplay";
import {
  useFetchAllPostsQuery,
  useFetchLoginedUserQuery,
  useFetchUserProfileQuery,
} from "../features/apiSlice";

const TrendingPosts = () => {
  const { isAuthenticated } = useSelector((state) => state.authorize);
  const { data } = useFetchLoginedUserQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: profileData } = useFetchUserProfileQuery(data?.userId, {
    skip: !data?.userId,
  });

  const { data: allPosts, isLoading, isError, error } = useFetchAllPostsQuery();

  const trendingPosts = allPosts?.allPosts
    ? [...allPosts?.allPosts].sort((a, b) => b.likes.length - a.likes.length)
    : allPosts;

  return (
    <>
      {isError && <h1>{error}</h1>}
      <h2 className="text-center pb-2">Trending Posts</h2>
      {!isLoading ? (
        trendingPosts?.map((post) => {
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

export default TrendingPosts;
