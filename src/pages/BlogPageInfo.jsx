import React from "react";
import { useLocation } from "react-router-dom";

const BlogPageInfo = () => {
  const { state } = useLocation();
  const { blog = {}, author = {} } = state || {};

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.blog_description}</p>
      <p>
        Author: {author.global_user ? `${author.global_user.first_name} ${author.global_user.last_name}` : "Loading..."}
      </p>
      {/* Otros detalles del blog */}
    </div>
  );
};

export default BlogPageInfo;
