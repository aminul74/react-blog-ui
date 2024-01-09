import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blogs from "./pages/BlogsPage";
import UserForm from "./pages/UserForm";
import ProfilePage from "./pages/ProfilePage";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import About from "./pages/About";

const MemoizedHeader = React.memo(Header);
const MemoizedFooter = React.memo(Footer);

function App() {
  return (
    <Router>
      <MemoizedHeader />
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Routes>
          <Route path="/not" element={<NotFound />} />
          <Route path="/" element={<Blogs />} />
          {/* <Route path="/blogs/:page" element={<Blogs />} /> */}
          <Route path="/login" element={<UserForm />} />
          <Route path="/user/:userId" element={<ProfilePage />} />
          <Route path="/blog/:uuId" element={<BlogDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/404" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
      <div style={{ position: "sticky", bottom: 0, marginTop: 10 }}>
        <MemoizedFooter />
      </div>
    </Router>
  );
}

export default App;
