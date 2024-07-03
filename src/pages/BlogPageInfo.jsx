import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBlogsStore from "../app/blogSlice.js";
import useAuthorsStore from "../app/authorsSlice.js";
import LinkElement from "../components/singleComponents/linkElement.jsx";

const BlogPageInfo = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const blogs = useBlogsStore((state) => state.blogs);
  const status = useBlogsStore((state) => state.status);
  const error = useBlogsStore((state) => state.error);
  const fetchBlogs = useBlogsStore((state) => state.fetchBlogs);
  const authors = useAuthorsStore((state) => state.authors);

  useEffect(() => {
    if (status === "idle") {
      fetchBlogs();
    }
  }, [status, fetchBlogs]);

  useEffect(() => {
    const foundBlog = blogs.find((blog) => blog._id === id);
    if (foundBlog) {
      setBlog(foundBlog);
    } else if (status === "succeeded") {
      console.error(`No se encontró ningún blog con el id ${id}`);
    }
  }, [id, blogs, status]);

  if (status === "idle" || status === "loading") {
    return <div>Cargando...</div>;
  }

  if (status === "failed") {
    return <div>Error al cargar blogs: {error}</div>;
  }

  if (!blog) {
    return <div>No se encontró ningún blog con el id {id}</div>;
  }
  const renderTags = (tags) => {
    if (typeof tags === "string") {
      return tags
        .split(",")
        .map((tag, index) => <li key={index}>{tag.trim()}</li>);
    }
    return null;
  };
  return (
    <div>
      <div className="preview-blog-container">
        {blog.blog_image_url && (
          <img
            src={blog.blog_image_url.map((imgArray) => imgArray.url)}
            alt={blog.blog_image_url.map((imgArray) => imgArray.alt)}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          />
        )}

        <h3>{blog.title}</h3>
        <ul className="tags-list">{blog.tags && renderTags(blog.tags)}</ul>
        <p>{blog.blog_description}</p>
        <div className="sections-preview">
          {blog.sections.map((section, index) => (
            <div key={index} className="section-preview">
              <h4>{section.title}</h4>
              <div>
                {Array.isArray(section.content) &&
                  section.content.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
              </div>
              {Array.isArray(section.list) && section.list.length > 0 && (
                <div>
                  <ul>
                    {section.list.map(
                      (item, itemIndex) =>
                        item && (
                          <li key={itemIndex} className="list">
                            {item}
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPageInfo;
