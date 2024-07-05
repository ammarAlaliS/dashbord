import React, { useEffect, useState } from "react";
import useBlogsStore from "../app/blogSlice.js";
import useAuthorsStore from "../app/authorsSlice.js";
import CloseAgree from "./singleComponents/CloseAgree.jsx";
import { FaRegComments } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "../style/blogContainer.css";

const Blog = () => {
  const blogs = useBlogsStore((state) => state.blogs);
  const fetchBlogs = useBlogsStore((state) => state.fetchBlogs);
  const fetchAuthorById = useAuthorsStore((state) => state.fetchAuthorById);
  const authors = useAuthorsStore((state) => state.authors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs]);


  useEffect(() => {
    const fetchBlogAuthors = async () => {
      try {
        const uniqueUserIds = Array.from(
          new Set(blogs.map((blog) => blog.user))
        );

        const authorPromises = uniqueUserIds.map(async (userId) => {
          if (!authors[userId]) {
            await fetchAuthorById(userId);
          }
        });
        await Promise.all(authorPromises);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los autores de los blogs:", error);
      }
    };
    if (blogs.length > 0) {
      fetchBlogAuthors();
    } else {
      setLoading(false);
    }
  }, [blogs, authors, fetchAuthorById]);

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

  if (blogs.length === 0) {
    return (
      <div className="blogCardContainerLoder">
        <p>No hay blogs disponibles.</p>
      </div>
    );
  }

  return (
    <div className="blogCardContainer">
      {blogs.map((blog) => (
        <BlogItem
          key={blog._id}
          blog={blog}
          authors={authors}
          fetchAuthorById={fetchAuthorById}
        />
      ))}
    </div>
  );
};

const BlogItem = ({ blog, authors, fetchAuthorById }) => {
  const [showMore, setShowMore] = React.useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  let blogId = blog._id;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleDeleteBlog = () => {
    setDeleteAlert(!deleteAlert);
    return <CloseAgree />;
  };

  return (
    <div className="blogItem">
      {blog.blog_image_url && blog.blog_image_url.length > 0 && (
        <img src={blog.blog_image_url[0].url} alt={blog.blog_image_url[0].alt} />
      )}
      <div className="card-blog-info">
        <h2>{blog.title}</h2>
        <ul>
          {blog.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
        <p className="blogDescription">
          {showMore
            ? blog.blog_description
            : `${blog.blog_description.slice(0, 120)}...`}
        </p>
      </div>
      <div className="showmore">
        <button onClick={toggleShowMore}>
          {showMore ? "Leer menos" : "Leer más"}
        </button>
      </div>
      <div className="authorInfo">
        <p>
          Autor:{" "}
          <span>
            {authors[blog.user]
              ? `${authors[blog.user].global_user.first_name} ${authors[blog.user].global_user.last_name}`
              : "Cargando..."}
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
        <div className="BlogButtonContainerChoice">
          <button className="editButton" onClick={handleDeleteBlog}>
            {`Delete`}
          </button>
          <Link
            className="deleteButton"
            to={`/QuickCar/Editar/Blog/id=${blog._id}`}
          >
            Editar
          </Link>
        </div>
        <div className="reedButtonContainer">
          <Link className="reedButton" to={`/QuickCar/Leer/Blog/${blog._id}`}>
            Leer blog
          </Link>
        </div>
        {deleteAlert && (
          <CloseAgree
            blogId={blogId}
            deleteAlert={deleteAlert}
            setDeleteAlert={setDeleteAlert}
          />
        )}
      </div>
    </div>
  );
};

export default Blog;
