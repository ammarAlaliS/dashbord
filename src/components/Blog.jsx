import React, { useEffect, useState } from "react";
import "../style/blogContainer.css";
import { FaRegComments } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://obbaramarket-backend.onrender.com";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/ObbaraMarket/blogs`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false); // Indicamos que la carga ha finalizado
      }
    };
    fetchBlogData();
  }, []);

  console.log(blogs);

  useEffect(() => {
    const fetchBlogAuthors = async () => {
      try {
        const authorPromises = blogs.map(async (blog) => {
          const authorResponse = await fetch(
            `${API_BASE_URL}/api/ObbaraMarket/user/${blog.user}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!authorResponse.ok) {
            throw new Error("Network response was not ok");
          }
          const authorData = await authorResponse.json();
          return { [blog._id]: authorData };
        });
        const resolvedAuthors = await Promise.all(authorPromises);
        const authorMap = resolvedAuthors.reduce((acc, author) => {
          const blogId = Object.keys(author)[0];
          acc[blogId] = author[blogId];
          return acc;
        }, {});
        setAuthors(authorMap);
      } catch (error) {
        console.error("Error fetching blog authors:", error);
      }
    };
    if (blogs.length > 0) {
      fetchBlogAuthors();
    }
  }, [blogs, token]);

  if (loading) {
    return (
      <div className="blogCardContainerLoder">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }

  return (
    <div className="blogCardContainer">
      {blogs.map((blog) => (
        <div key={blog._id} className="blogItem">
          {blog.blog_image_url.length > 0 && (
            <img
              src={blog.blog_image_url[0].url}
              alt={blog.blog_image_url[0].alt}
            />
          )}
          <h2>{blog.title}</h2>
          <ul>
            {blog.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
          <p>{blog.blog_description}</p>
          <div className="authorInfo">
            <p>
              Author:{" "}
              <span>
                {authors[blog._id]
                  ? `${authors[blog._id].global_user.first_name} ${authors[blog._id].global_user.last_name
                  }`
                  : "Loading..."}
              </span>
            </p>
            <p>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
          <div className="iconContainer">
            <div className="commentContainer">
              <span>
                <FaRegComments />
              </span>
              <strong>0</strong>
            </div>
            <div className="likeContainer">
              <span>
                <AiOutlineLike />
              </span>
              <strong>0</strong>
            </div>
          </div>
          <div className="blogButtonContainer">
            <Link to={`/QuickCar/Blog/Contenido/${blog._id}`}>
              <button>Leer Blog</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
