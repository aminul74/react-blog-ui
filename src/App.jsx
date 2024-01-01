import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Blogs from "./components/Blogs/BlogList";
import AuthForm from "./components/UserForm/UserForm";
import BlogForm from "./components/BlogForm/BlogForm";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create-blog" element={<BlogForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
