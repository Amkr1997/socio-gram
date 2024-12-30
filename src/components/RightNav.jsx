import styles from "../css/rightNav.module.css";
import { BsSearch } from "react-icons/bs";
import {
  useFetchLoginedUserQuery,
  useFetchUserProfileQuery,
  useFetchUsersQuery,
  useFollowUnfollowMutation,
} from "../features/apiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RightNav = () => {
  const [search, setSearch] = useState("");
  const { isAuthenticated } = useSelector((state) => state.authorize);
  const { data: loginUserData, refetch: refetchLoginUser } =
    useFetchLoginedUserQuery(undefined, {
      skip: !isAuthenticated,
    });
  const { data: profileData } = useFetchUserProfileQuery(
    loginUserData?.userId,
    {
      skip: !loginUserData?.userId,
    }
  );
  const [followUnfollow] = useFollowUnfollowMutation();
  const { data, isLoading, isError, error } = useFetchUsersQuery();

  const handleFollowUnfollow = async (userId) => {
    try {
      if (isAuthenticated) {
        await followUnfollow({ userId, followerId: loginUserData?.userId });
      } else {
        toast.warning("Login first");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchUser = data?.allUsers?.filter((user) => {
    return user.name.toLowerCase() === search.toLowerCase();
  });

  useEffect(() => {
    refetchLoginUser();
  }, [isAuthenticated]);

  return (
    <section className={`${styles.rightNav}`}>
      <div
        className={`ps-3 bg-white py-2 rounded-4 w-100 ${styles.searchContainer}`}
      >
        <BsSearch className="fs-5" />
        <input
          type="text"
          className={`${styles.searchFollowers} border-0`}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr className="mb-0" />

      <div className="pt-4">
        <h3 className="text-center">More Users</h3>

        {isError && <h1>{error}</h1>}
        {!isLoading ? (
          <>
            {searchUser?.length > 0
              ? searchUser?.map((user) => {
                  if (user._id !== loginUserData?.userId) {
                    return (
                      <div
                        key={user._id}
                        className="my-2 px-1 py-2 border border-1 rounded-4 d-flex align-items-center justify-content-between flex-wrap"
                      >
                        <img
                          src={
                            user.displayPic ||
                            "https://placehold.co/50x50/dodgerblue/white"
                          }
                          alt="user-image"
                          className="rounded-circle"
                        />

                        <Link
                          to={`/othersProfile/${user._id}`}
                          className={`${styles.name} d-flex flex-column px-2`}
                        >
                          <span className="fw-medium">{user.name}</span>
                          <span className="fw-normal">@{user.userName}</span>
                        </Link>

                        <button
                          className={`${styles.followBtn}`}
                          onClick={() => handleFollowUnfollow(user._id)}
                        >
                          {profileData?.following.includes(user._id)
                            ? "Unfollow"
                            : "follow"}
                        </button>
                      </div>
                    );
                  }
                })
              : data?.allUsers?.slice(0, 6).map((user) => {
                  if (user._id !== loginUserData?.userId) {
                    return (
                      <div
                        key={user._id}
                        className="my-2 px-1 py-2 border border-1 rounded-4 d-flex align-items-center justify-content-between flex-wrap"
                      >
                        <img
                          src={
                            user.displayPic ||
                            "https://placehold.co/50x50/dodgerblue/white"
                          }
                          alt="user-image"
                          className={`rounded-circle img-fluid ${styles.userImg}`}
                        />

                        <Link
                          to={`/othersProfile/${user._id}`}
                          className={`${styles.name} d-flex flex-column px-2`}
                        >
                          <span className="fw-medium">{user.name}</span>
                          <span className="fw-normal">@{user.userName}</span>
                        </Link>

                        <button
                          className={`${styles.followBtn}`}
                          onClick={() => handleFollowUnfollow(user._id)}
                        >
                          {profileData?.following.includes(user._id)
                            ? "Unfollow"
                            : "follow"}
                        </button>
                      </div>
                    );
                  }
                })}
          </>
        ) : (
          <p className="fs-5 text-center fw-normal">Loading...</p>
        )}
      </div>
    </section>
  );
};

export default RightNav;
