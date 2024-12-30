import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL;

const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["GetUserProfile", "GetAllPosts", "GetCompleteUserProfile"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem("jwtToken");

      const protectedEndPoints = ["fetchLoginedUser"];

      if (token && protectedEndPoints.includes(endpoint)) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      // User endpoints
      registerUser: builder.mutation({
        query: (userData) => {
          return {
            url: "/register",
            method: "POST",
            body: userData,
          };
        },

        transformResponse: (data) => {
          return data?.message || "Can't find data some problem";
        },
      }),

      loginUser: builder.mutation({
        query: (userData) => {
          return {
            url: "/login",
            method: "POST",
            body: userData,
          };
        },
      }),

      fetchLoginedUser: builder.query({
        query: () => {
          return {
            url: "/demoVerify",
            method: "GET",
          };
        },

        transformResponse: (response) => {
          return response?.loginUserId;
        },

        invalidatesTags: ["GetUserProfile"],
      }),

      fetchUserProfile: builder.query({
        query: (userId) => {
          return `/api/users/${userId}`;
        },

        transformResponse: (profileData) => {
          return profileData?.singleUser;
        },

        providesTags: ["GetUserProfile"],
      }),

      fetchUsers: builder.query({
        query: () => {
          return {
            url: "/api/users/username",
            method: "GET",
          };
        },
      }),

      updateUserProfile: builder.mutation({
        query: (dataToUpdate) => {
          return {
            url: `/api/users/edit/${dataToUpdate._id}`,
            method: "POST",
            body: dataToUpdate,
          };
        },

        invalidatesTags: ["GetCompleteUserProfile"],
      }),

      // Post endpoints
      fetchAllPosts: builder.query({
        query: () => {
          return {
            url: `/api/posts`,
            method: "GET",
          };
        },

        providesTags: ["GetAllPosts"],
      }),

      createPost: builder.mutation({
        query: (postData) => {
          return {
            url: `/api/user/post`,
            method: "POST",
            body: postData,
          };
        },

        invalidatesTags: ["GetAllPosts", "GetUserProfile"],
      }),

      editPost: builder.mutation({
        query: (dataToUpdate) => {
          let dataId;
          dataToUpdate.forEach((value, key) => {
            if (key === "_id") {
              dataId = value;
            }
          });

          return {
            url: `/api/posts/edit/${dataId}`,
            method: "POST",
            body: dataToUpdate,
          };
        },

        invalidatesTags: ["GetAllPosts"],
      }),

      likePost: builder.mutation({
        query: ({ postId, userId }) => {
          return {
            url: `/api/${userId}/like/${postId}`,
            method: "POST",
          };
        },

        onQueryStarted: async (
          { postId, userId },
          { dispatch, queryFulfilled }
        ) => {
          // Optimistic update for post
          const updatePost = dispatch(
            apiSlice.util.updateQueryData(
              "fetchAllPosts",
              undefined,
              (draft) => {
                const likedPost = draft?.allPosts?.find(
                  (post) => post._id === postId
                );

                if (likedPost && !likedPost.likes.includes(userId)) {
                  likedPost.likes.push(userId);
                } else if (likedPost && likedPost.likes.includes(userId)) {
                  likedPost.likes = likedPost.likes.filter(
                    (id) => id !== userId
                  );
                }
              }
            )
          );

          // Optimistic update for user.
          const updateUser = dispatch(
            apiSlice.util.updateQueryData(
              "fetchUserProfile",
              userId,
              (draft) => {
                if (draft && draft.postsLiked.includes(postId)) {
                  draft.postsLiked = draft.postsLiked.filter(
                    (id) => id !== postId
                  );
                } else {
                  draft.postsLiked.push(postId);
                }
              }
            )
          );
          try {
            await queryFulfilled; // await mutation
          } catch (error) {
            updatePost.undo();
            updateUser.undo();
          }
        },

        invalidatesTags: [
          "GetUserProfile",
          "GetAllPosts",
          "GetCompleteUserProfile",
        ],
      }),

      bookMarkPost: builder.mutation({
        query: ({ userId, postId }) => {
          return {
            url: `/api/${userId}/bookmark/${postId}`,
            method: "POST",
          };
        },

        onQueryStarted: async (
          { userId, postId },
          { dispatch, queryFulfilled }
        ) => {
          const updateBookmark = dispatch(
            apiSlice.util.updateQueryData(
              "fetchUserProfile",
              userId,
              (draft) => {
                if (draft && draft.bookmarks.includes(postId)) {
                  draft.bookmarks = draft?.bookmarks?.filter((id) => {
                    return id !== postId;
                  });
                } else {
                  draft?.bookmarks?.push(postId);
                }
              }
            )
          );

          try {
            await queryFulfilled;
          } catch (error) {
            updateBookmark.undo();
          }
        },

        invalidatesTags: [
          "GetUserProfile",
          "GetAllPosts",
          "GetCompleteUserProfile",
        ],
      }),

      deletePost: builder.mutation({
        query: ({ userId, postId }) => {
          return {
            url: `/api/${userId}/posts/${postId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["GetAllPosts", "GetCompleteUserProfile"],
      }),

      followUnfollow: builder.mutation({
        query: ({ userId, followerId }) => {
          return {
            url: `/api/${followerId}/follow/${userId}`,
            method: "POST",
          };
        },

        onQueryStarted: async (
          { userId, followerId },
          { dispatch, queryFulfilled }
        ) => {
          const updateFollowing = dispatch(
            apiSlice.util.updateQueryData(
              "fetchUserProfile",
              followerId,
              (draft) => {
                if (!draft.following.includes(userId)) {
                  draft.following.push(userId);
                } else {
                  draft.following = draft.following.filter(
                    (id) => id !== userId
                  );
                }
              }
            )
          );

          try {
            await queryFulfilled;
          } catch (error) {
            updateFollowing.undo();
          }
        },

        invalidatesTags: ["GetUserProfile", "GetCompleteUserProfile"],
      }),

      getUserProfileData: builder.query({
        query: (userId) => {
          return {
            url: `/get/profile/data/${userId}`,
            method: "GET",
          };
        },

        providesTags: ["GetCompleteUserProfile", ""],
      }),
    };
  },
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchLoginedUserQuery,
  useFetchUserProfileQuery,
  useFetchAllPostsQuery,
  useLikePostMutation,
  useBookMarkPostMutation,
  useFollowUnfollowMutation,
  useFetchUsersQuery,
  useGetUserProfileDataQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdateUserProfileMutation,
  useEditPostMutation,
} = apiSlice;

export default apiSlice;
