import { createContext, useState, useContext } from "react";
const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogList, setBlogList] = useState([]);

  return (
    <BlogContext.Provider value={{blogList, setBlogList}}>
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
