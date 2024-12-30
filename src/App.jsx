import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import LatestPost from "./pages/LatestPosts";
import TrendingPosts from "./pages/TrendingPosts";
import BookMarks from "./pages/BookMarks";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import RefreshHandler from "./components/RefreshHandler";
import EditProfile from "./components/EditProfile";
import OthersProfile from "./pages/OthersProfile";
import EditPost from "./components/EditPost";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <RefreshHandler />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Feed />}>
                <Route index element={<LatestPost />} />
                <Route path="trending" element={<TrendingPosts />} />
              </Route>
              <Route path="/editPost/:postId" element={<EditPost />} />
            </Route>
            <Route
              path={"/bookmarks"}
              element={<PrivateRoute element={<BookMarks />} />}
            />
            <Route
              path={"/explore"}
              element={<PrivateRoute element={<Explore />} />}
            />
            <Route
              path={"/profile"}
              element={<PrivateRoute element={<Profile />} />}
            >
              <Route path="edit" element={<EditProfile />} />
            </Route>
            <Route
              path="/othersProfile/:userId"
              element={<PrivateRoute element={<OthersProfile />} />}
            />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
