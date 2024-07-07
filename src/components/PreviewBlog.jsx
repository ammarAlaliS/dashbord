import React from "react";
import "../style/previewContainer.css";

const PreviewBlog = ({ blogData }) => {
  const renderTags = (tags) => {
    if (typeof tags === "string") {
      return tags
        .split(",")
        .map((tag, index) => <li key={index}>{tag.trim()}</li>);
    }
    return null;
  };

  const formatParagraph = (paragraph) => {
    const parts = paragraph.split(':');
    if (parts.length > 1) {
      return (
        <>
          <strong className="strong">{parts[0]}:</strong>
          {parts.slice(1).join(':')}
        </>
      );
    }
    return paragraph;
  };

  return (
    <div className="preview-blog-container">
      <h2>Vista Previa del Blog</h2>
      {blogData.blog_image_url && blogData.blog_image_url.length > 0 && (
        <div className="imgBlogMain">
          {blogData.blog_image_url.map((file, index) => (
            <img
              key={index}
              src={
                file instanceof File
                  ? URL.createObjectURL(file)
                  : file
              }
              alt={`Imagen ${index}`}
            />
          ))}
        </div>
      )}
      <h3>{blogData.title}</h3>
      <ul className="tags-list">
        {blogData.tags && renderTags(blogData.tags)}
      </ul>
      <p className="previewDescription">{blogData.blog_description}</p>
      <div className="sections-preview">
        {blogData.sections.map((section, index) => (
          <div key={index} className="section-preview">
            <h4>{section.title}</h4>
            <div>
              {Array.isArray(section.content) &&
                section.content.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{formatParagraph(paragraph)}</p>
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
  );
};

export default PreviewBlog;
