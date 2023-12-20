import Navbar from "./components/Header/Header";
import BlogList from "./components/Body/BlogList";
import ToggleSidebar from "./components/Sidebar/ToggleSidebar";
import Pagination from "./components/Pagination/Pagination";
import Footer from "./components/Footer/Footer";
import Button from "./components/CreateButton/Button";

function App() {
  const BlogCard = {
    title: "Classical Literature",
    content:
      "Contrary There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humourto popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.This is a simple blog post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. It was popularised in the 1960s with the release.This is a simple blog post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. It was popularised in the 1960s with the release.",
    authorId: "6e69b973-2dd8-41ab-b0ab-7375026402dc",
  };

  return (
    <div className="mb-10">
      <Navbar />
      <ToggleSidebar />
      <Button />
      <BlogList
        title={BlogCard.title}
        content={BlogCard.content}
        author={BlogCard.authorId}
      />
      <BlogList
        title={BlogCard.title}
        content={BlogCard.content}
        author={BlogCard.authorId}
      />
      <BlogList
        title={BlogCard.title}
        content={BlogCard.content}
        author={BlogCard.authorId}
      />
      <BlogList
        title={BlogCard.title}
        content={BlogCard.content}
        author={BlogCard.authorId}
      />
      <BlogList
        title={BlogCard.title}
        content={BlogCard.content}
        author={BlogCard.authorId}
      />
      <Pagination />
      <Footer />
    </div>
  );
}

export default App;
