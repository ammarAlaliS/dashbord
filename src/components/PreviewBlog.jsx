import React from "react";
import '../style/previewContainer.css';

const PreviewBlog = ({ blogData }) => {

  const renderTags = (tags) => {
    if (typeof tags === 'string') {
      return tags.split(',').map((tag, index) => (
        <li key={index}>{tag.trim()}</li>
      ));
    }
    return null; // o puedes devolver un mensaje indicando que no hay etiquetas
  };

  return (
    <div className="preview-blog-container">
      <h2>Vista Previa del Blog</h2>
      {blogData.blog_image_url && (
        <img
          src={
            blogData.blog_image_url instanceof File
              ? URL.createObjectURL(blogData.blog_image_url)
              : blogData.blog_image_url
          }
          alt="Blog Preview"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
      )}
      <h3>{blogData.title}</h3>
      <ul className="tags-list">
        {blogData.tags && renderTags(blogData.tags)}
      </ul>
      <p>{blogData.blog_description}</p>
      <div className="sections-preview">
        {blogData.sections.map((section, index) => (
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
                  {section.list.map((item, itemIndex) => (
                    item && (
                      <li key={itemIndex} className="list">
                        {item}
                      </li>
                    )
                  ))}
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
