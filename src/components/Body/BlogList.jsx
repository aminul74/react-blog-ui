import { useState } from "react";
import PropTypes from "prop-types";

const BlogList = ({ title, content, author }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContentVisibility = () => {
    setShowFullContent(!showFullContent);
  };

  let truncatedContent = content;

  if (Array.isArray(content)) {
    truncatedContent = content.slice(0, 0);
  } else if (typeof content === "string") {
    truncatedContent = content.slice(0, 300);
  }

  return (
    <div
      className={`min-w-64 max-w-${
        showFullContent ? "7xl" : "md"
      } mx-auto bg-slate-50 rounded-xl md:max-w-7xl mt-5 mb-5 p-4`}
    >
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {author}
          </div>
          <a
            href="#"
            className="mt-1 text-lg leading-tight font-medium text-black-600 hover:underline"
          >
            {title}
          </a>
          <div className="mt-2 text-black-800 text-xl">
            {showFullContent ? (
              content
            ) : (
              <>
                {Array.isArray(truncatedContent)
                  ? truncatedContent.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  : truncatedContent}
                {content.length > 150 && (
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={toggleContentVisibility}
                  >
                    {showFullContent ? " See Less" : " See More"}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BlogList.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  author: PropTypes.string.isRequired,
};

export default BlogList;
