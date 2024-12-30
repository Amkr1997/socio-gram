import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import {
  useFetchAllPostsQuery,
  useFetchLoginedUserQuery,
  useFetchUserProfileQuery,
} from "../features/apiSlice";
import PostDisplay from "../components/PostDisplay";
import BottomNav from "../components/BottomNav";

const Explore = () => {
  const { isAuthenticated } = useSelector((state) => state.authorize);
  const { data } = useFetchLoginedUserQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: profileData } = useFetchUserProfileQuery(data?.userId, {
    skip: !data?.userId,
  });
  const { data: allPosts, isLoading, isError, error } = useFetchAllPostsQuery();

  return (
    <section>
      <Navbar />
      <div className={`container-fluid px-4 pt-4 pb-5`}>
        <div className="row">
          <div className="col-lg-2 col-xl-2">
            <LeftNav />
          </div>
          <div className="col-12 col-md-8 col-lg-6 col-xl-7">
            <h1 className="text-center pb-3">Explore</h1>
            {isError && <h1>{error.message}</h1>}
            {!isLoading ? (
              allPosts?.allPosts?.map((post) => {
                return (
                  <PostDisplay
                    key={post._id}
                    post={post}
                    isAuthenticated={isAuthenticated}
                    profileData={profileData}
                  />
                );
              })
            ) : (
              <p className="fs-5 text-center fw-normal">Loading...</p>
            )}
          </div>
          <div className="col-md-4 col-lg-4 col-xl-3">
            <RightNav />
          </div>
        </div>
      </div>
      <BottomNav />
    </section>
  );
};

export default Explore;
