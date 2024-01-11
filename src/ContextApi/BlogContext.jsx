import { createContext, useState, useContext } from "react";
const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogList, setBlogList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState(null);
  const updateBlogList = (newBlogList) => {
    setBlogList(newBlogList);
  };

  return (
    <BlogContext.Provider
      value={{
        blogList,
        setBlogList,
        updateBlogList,
        pageNumber,
        setPageNumber,
        totalCount,
        setTotalCount,
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
