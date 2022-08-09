import { Routes, Route, HashRouter } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Settings from "@/pages/Settings";
import Editor from "@/pages/Editor";
import Profile from "@/pages/Profile";
import Favorites from "@/pages/Profile/Favorites";
import Article from "@/pages/Article";

import PrivateRoute from "@/utils/PrivateRoute";
import NotFound from "@/utils/NotFound";

const App = () => {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/:userId/favorites" element={<Favorites />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route element={<PrivateRoute />}>
            <Route path="/settings" element={<Settings />} />
            <Route path="/editor" element={<Editor />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
};

export default App;
