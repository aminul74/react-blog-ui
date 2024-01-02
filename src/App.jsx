import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blogs from "./components/BlogList";
import AuthForm from "./components/UserForm";
import BlogForm from "./components/BlogForm";
import Profile from "./components/ProfileButton";
import BlogItem from "./components/BlogCard";
import ProfileItem from "./components/ProfileItem";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create-blog" element={<BlogForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<BlogItem />} />
        <Route path="/user/:userId" element={<ProfileItem />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
