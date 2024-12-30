/*
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostsAsync = createAsyncThunk("fetchPosts", async () => {
  try {
    const fetchPosts = await axios.get(
      "https://major-project-2-backend.vercel.app/allPosts"
    );

    //console.log(fetchPosts.data);
    return fetchPosts.data;
  } catch (error) {
    console.log(error);
  }
});

export const addPostsAsync = createAsyncThunk("addPosts", async (dataToAdd) => {
  try {
    const addedPost = await axios.post(
      `https://major-project-2-backend.vercel.app/api/user/post/${dataToAdd}`
    );

    return addedPost.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUsersAsync = createAsyncThunk("fetch/Users", async () => {
  try {
    const fetchUsers = await axios.get(
      `https://major-project-2-backend.vercel.app/api/users/username`
    );

    return fetchUsers.data;
  } catch (error) {
    console.log(error);
  }
});

export const likePostAsync = createAsyncThunk(
  "likePostAsync",
  async ({ postId, userId }) => {
    try {
      const likePost = await axios.post(
        `https://major-project-2-backend.vercel.app/api/${userId}/like/${postId}`
      );

      return likePost.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bookmarkAsync = createAsyncThunk(
  "bookmarkAsync",
  async ({ postId, userId }) => {
    try {
      const postBookMarked = await axios.post(
        `https://major-project-2-backend.vercel.app/api/${userId}/bookmark/${postId}`
      );

      return postBookMarked.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    users: [],
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPostsAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
      state.status = "success";
      //console.log(current(state));
      state.posts = action.payload.populatedPosts;
    });

    builder.addCase(fetchPostsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      addPostsAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(addPostsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.posts.push(action.payload);
    });

    builder.addCase(addPostsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      fetchUsersAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload.allUsers;
    });

    builder.addCase(fetchUsersAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      likePostAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(likePostAsync.fulfilled, (state, action) => {
      state.status = "success";

      if (action.payload.message === "Liked post") {
        const updatedPost = action.payload.likedPost;

        const updatedPostIndex = state.posts.findIndex((post) => {
          return post._id === updatedPost._id;
        });

        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex] = updatedPost;
        }
      } else if (action.payload.message === "Disliked post") {
        const updatedPost = action.payload.dislikedPost;

        const postToUpdate = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );

        state.posts[postToUpdate] = updatedPost;
      }
    });

    builder.addCase(likePostAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      bookmarkAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(bookmarkAsync.fulfilled, (state, action) => {
      state.status = "success";
    });

    builder.addCase(bookmarkAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default postSlice;
*/
