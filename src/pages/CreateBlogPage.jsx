import React, { useState } from "react";
import CreateBlog from "../components/CreateBlog";
import PreviewBlog from "../components/PreviewBlog";
import "../style/blog.css";

export default function BlogPage() {
  const [blogData, setBlogData] = useState({
    blog_image_url: [], 
    title: "",
    tags: [], 
    blog_description: "",
    sections: [{
      title: "",
      content: [], 
      list: [],     
      links: []   
    }],
  });
  const handleBlogDataChange = (newBlogData) => {
    setBlogData(newBlogData);
  };

  return (
    <div className="blogContainer">
      <div className="createBlogContainer">
        <CreateBlog blogData={blogData} setBlogData={setBlogData} onChange={handleBlogDataChange} />
      </div>
      <div className="previewBlogContainer">
        <PreviewBlog blogData={blogData} />
      </div>
    </div>
  );
}
