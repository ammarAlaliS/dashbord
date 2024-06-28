import React, { useEffect, useState } from "react";
import "../style/blogContainer.css";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          "https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket/blogs"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data); 
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []); 

  return (
    <div className="blogContainer">
      {blogs.map(blog => (
        <div key={blog._id} className="blogItem">
          <h2>{blog.title}</h2>
          <p>{blog.blog_description}</p>
          <ul>
            {blog.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  );
}
