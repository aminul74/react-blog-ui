import { createContext, useState, useContext } from "react";
const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogList, setBlogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const updateBlogList = (newBlogList) => {
    setBlogList(newBlogList);
  };

  return (
    <BlogContext.Provider
      value={{
        blogList,
        setBlogList,
        updateBlogList,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};
