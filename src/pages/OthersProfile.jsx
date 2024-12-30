import Navbar from "../components/Navbar";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import {
  useFetchLoginedUserQuery,
  useFetchUserProfileQuery,
  useGetUserProfileDataQuery,
  useFollowUnfollowMutation,
  useFetchUsersQuery,
} from "../features/apiSlice";
import styles from "../css/othersProfile.module.css";
import { Link, useParams } from "react-router-dom";
import PostDisplay from "../components/PostDisplay";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import BottomNav from "../components/BottomNav";

const OthersProfile = () => {
  const { userId } = useParams();
  const { isAuthenticated } = useSelector((state) => state.authorize);
  const { data: logindUserData } = useFetchLoginedUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const { data: profileData } = useFetchUserProfileQuery(
    logindUserData?.userId,
    {
      skip: !logindUserData?.userId,
    }
  );

  const {
    data: completeProfileData,
    isLoading,
    isError,
    error,
  } = useGetUserProfileDataQuery(userId, {
    skip: !userId,
  });
  // const { data: allUsers } = useFetchUsersQuery();

  const [followUnfollow] = useFollowUnfollowMutation();

  const handleFollowUnfollow = async (userId) => {
    try {
      if (isAuthenticated) {
        await followUnfollow({ userId, followerId: logindUserData?.userId });
      } else {
        toast.warning("Login first");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Navbar />
      <div className={`container-fluid px-4 pt-4 pb-5`}>
        <div className="row">
          <div className="col-lg-2 col-xl-2">
            <LeftNav />
          </div>

          <div className="col-12 col-md-8 col-lg-6 col-xl-7">
            <div className="card py-2 border border-0">
              <img
                src={
                  completeProfileData?.profileData?.displayPic ||
                  "https://placehold.co/100x100/coral/white"
                }
                alt="displaypic"
                className={`img-fluid mx-auto rounded-circle ${styles.displayPic}`}
              />
              <h2 className="text-center text-capitalize pt-2 pb-1 m-0">
                {completeProfileData?.profileData?.name}
              </h2>
              <h5 className="text-center text-body-tertiary">
                @{completeProfileData?.profileData?.userName}
              </h5>
              <div className="pt-2 d-flex align-items-center justify-content-center">
                <button
                  className={`${styles.followBtn} px-4`}
                  onClick={() => handleFollowUnfollow(userId)}
                >
                  {profileData?.following.includes(userId)
                    ? "Unfollow"
                    : "follow"}
                </button>
              </div>
              <div className="w-75 mx-auto">
                <h6 className="text-center text-secondary pt-4 pb-0">
                  {completeProfileData?.profileData?.bio}
                </h6>
              </div>
              <Link to="/" className={`m-0 py-2 ${styles.profileLink}`}>
                {completeProfileData?.profileData?.websiteLink}
              </Link>

              <div className="w-75 mx-auto py-2 bg-body-secondary d-flex align-items-center justify-content-around rounded">
                <div className="d-flex flex-column align-items-center">
                  <h5 className="m-0">
                    {completeProfileData?.profileData?.following?.length}
                  </h5>
                  <h5>Following</h5>
                </div>

                <div className="d-flex flex-column align-items-center">
                  <h5 className="m-0">
                    {completeProfileData?.profileData?.posts?.length}
                  </h5>
                  <h5>Posts</h5>
                </div>

                <div className="d-flex flex-column align-items-center">
                  <h5 className="m-0">
                    {completeProfileData?.profileData?.follower?.length}
                  </h5>
                  <h5>Followers</h5>
                </div>
              </div>

              <div className="px-4 py-5">
                <h3>Your Posts</h3>

                {isError && <h1>{error}</h1>}
                {!isLoading ? (
                  completeProfileData?.profileData?.posts
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
              </div>
            </div>
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

export default OthersProfile;
