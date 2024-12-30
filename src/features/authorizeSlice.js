import { createSlice } from "@reduxjs/toolkit";

/*
export const registerUserAsync = createAsyncThunk(
  "register/User",
  async (dataToAdd) => {
    try {
      const registerdUser = await axios.post(
        `https://major-project-2-backend.vercel.app/register/`,
        dataToAdd
      );

      return registerdUser.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "login/User",
  async (dataToAdd) => {
    try {
      const loginUser = await axios.post(
        `http://localhost:3000/login`,
        dataToAdd
      );

      //console.log(loginUser.data);
      return loginUser.data;
    } catch (error) {
      console.log(error);
    }
  }
);


export const fetchloginUser = createAsyncThunk(
  "fetch/LoginUser",
  async (req, res) => {
    try {
      const token = localStorage.getItem("accessToken");

      const headers = {
        Authorization: token,
      };

      const loginUser = await axios.get(`http://localhost:3000/demoVerify`, {
        headers,
      });

      return loginUser.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const singleUserAsync = createAsyncThunk(
  "single/User",
  async (userId) => {
    try {
      const singleUser = await axios.get(
        `http://localhost:3000/api/users/${userId}`
      );

      return singleUser.data;
    } catch (error) {
      console.log(error);
    }
  }
);
*/

const authorizeSlice = createSlice({
  name: "authorize",
  initialState: {
    //userId: null,
    //userInfo: [],
    isAuthenticated: !!localStorage.getItem("jwtToken"), // double negation, falsy if not.
    status: "idle",
    error: null,
  },

  reducers: {
    loginUserReducer: (state, action) => {
      localStorage.setItem("jwtToken", action.payload.jwtToken);
      state.isAuthenticated = true;
    },

    logoutUser: (state) => {
      localStorage.removeItem("jwtToken");
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    /*
    builder.addCase(
      registerUserAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(registerUserAsync.fulfilled, (state) => {
      state.status = "success";
    });

    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(loginUserAsync.pending, (state) => {
      void (state.status = "loading");
    });

    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.userInfo = action.payload.loginUser;
      state.isAuthenticated = true;

      localStorage.setItem("accessToken", action.payload.jwtToken);
    });

    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      fetchloginUser.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchloginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.userId = action.payload.loginUserId.userId;
    });

    builder.addCase(fetchloginUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      singleUserAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(singleUserAsync.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action.payload);
      state.userInfo = action.payload.singleUser;
    });

    builder.addCase(singleUserAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    */
  },
});

export const { logoutUser, loginUserReducer } = authorizeSlice.actions;

export default authorizeSlice;
