import React, { useState, useRef, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const CreateBlog = ({ blogData, onChange }) => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [manageButtonInfo, setManageButtonInfo] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [data, setData] = useState(null);
  const blogDescriptionRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight(blogDescriptionRef.current);
    blogData.sections.forEach((section, index) => {
      section.content.forEach((_, listIndex) => {
        adjustTextareaHeight(
          document.getElementById(`section_content_${index}_${listIndex}`)
        );
      });
    });
  }, [blogData]);

  const adjustTextareaHeight = (element) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  const handleChange = (e, index = null, field = null, listIndex = null) => {
    const { name, value, files } = e.target;

    if (name === "blog_image_url") {
      onChange({
        ...blogData,
        [name]: [...blogData.blog_image_url, ...Array.from(files)],
      });
    } else if (index === null) {
      onChange({
        ...blogData,
        [name]: value,
      });
    } else {
      const updatedSections = [...blogData.sections];
      if (field === "content" || field === "list") {
        updatedSections[index][field][listIndex] = value;
      } else {
        updatedSections[index][field] = value;
      }

      onChange({
        ...blogData,
        sections: updatedSections,
      });

      if (field === "content") {
        adjustTextareaHeight(
          document.getElementById(`section_content_${index}_${listIndex}`)
        );
      }
    }

    if (name === "blog_description") {
      adjustTextareaHeight(blogDescriptionRef.current);
    }
  };

  const addSection = () => {
    onChange({
      ...blogData,
      sections: [...blogData.sections, { title: "", content: [], list: [] }],
    });
  };

  const addListToSection = (sectionIndex) => {
    const updatedSections = [...blogData.sections];
    updatedSections[sectionIndex].list.push("");
    onChange({
      ...blogData,
      sections: updatedSections,
    });
  };

  const addContentToSection = (sectionIndex) => {
    const updatedSections = [...blogData.sections];
    updatedSections[sectionIndex].content.push("");
    onChange({
      ...blogData,
      sections: updatedSections,
    });
  };

  const removeContent = (sectionIndex, contentIndex) => {
    const updatedSections = [...blogData.sections];
    updatedSections[sectionIndex].content.splice(contentIndex, 1);
    onChange({
      ...blogData,
      sections: updatedSections,
    });
  };
  const removeList = (sectionIndex, listIndex) => {
    const updatedSections = [...blogData.sections];
    updatedSections[sectionIndex].list.splice(listIndex, 1);
    onChange({
      ...blogData,
      sections: updatedSections,
    });
  };

  const removeSection = (sectionIndex) => {
    const updatedSections = [...blogData.sections];
    updatedSections.splice(sectionIndex, 1);
    onChange({
      ...blogData,
      sections: updatedSections,
    });
  };

  const clearForm = () => {
    onChange({
      blog_image_url: [],
      title: "",
      tags: "",
      blog_description: "",
      sections: [{ title: "", content: [], list: [] }],
    });
    adjustTextareaHeight(blogDescriptionRef.current);
  };

  const handleDeleteImage = () => {
    const updatedImages = [...blogData.blog_image_url];
    updatedImages.pop();
    onChange({
      ...blogData,
      blog_image_url: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setManageButtonInfo(true);
      setShowTimeoutMessage(false);

      const formData = new FormData();
      blogData.blog_image_url.forEach((file) => {
        formData.append(`blog_image_url`, file);
      });
      formData.append("title", blogData.title);
      formData.append("tags", blogData.tags);
      formData.append("blog_description", blogData.blog_description);

      blogData.sections.forEach((section, index) => {
        formData.append(`sections[${index}][title]`, section.title);
        section.content.forEach((item, listIndex) => {
          formData.append(`sections[${index}][content][${listIndex}]`, item);
        });
        section.list.forEach((item, listIndex) => {
          formData.append(`sections[${index}][list][${listIndex}]`, item);
        });
      });

      const response = await Promise.race([
        axios.post(
          "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/create/blog",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 30000)
        ),
      ]);

      setData(response.data);
      setSuccessMessage("¡Blog creado exitosamente!");
      clearForm();
    } catch (error) {
      if (error.message === "Timeout") {
        setShowTimeoutMessage(true);
      } else {
        if (error.response) {
          console.log(error.response.data);
          if (error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else if (error.response.data.message) {
            setErrors({
              global: `Hubo un error al crear el blog: ${error.response.data.message}. Por favor, intenta de nuevo más tarde.`,
            });
          } else {
            setErrors({
              global:
                "Hubo un error al crear el blog. Por favor, intenta de nuevo más tarde.",
            });
          }
        } else {
          setErrors({
            global:
              "Hubo un error al conectar con el servidor. Por favor, intenta de nuevo más tarde.",
          });
        }
      }
    } finally {
      setManageButtonInfo(false);
    }
  };

  const validateForm = () => {
    const { title, blog_description, sections } = blogData;
    const newErrors = {};

    if (!title || title.length < 5 || title.length > 100) {
      newErrors.title = "El título debe tener entre 5 y 100 caracteres.";
    }

    if (!blog_description || blog_description.length < 10) {
      newErrors.blog_description =
        "La descripción del blog debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="create-blog-container">
      <h2>Crear Nuevo Blog</h2>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="blog_image_url" className="titleImg">
            Imagenes:
          </label>
          <div className="file-and-img">
            <div className="inputSelection">
              <input
                type="file"
                name="blog_image_url"
                id="blog_image_url"
                onChange={(e) => handleChange(e)}
                multiple
                required
                placeholder="Selecciona imágenes..."
                className="file"
              />
              <span>Subir imagenes</span>
            </div>
            {blogData.blog_image_url && blogData.blog_image_url.length > 0 && (
              <div className="image-previews">
                {blogData.blog_image_url.map((file, index) => (
                  <img
                    key={index}
                    src={
                      file instanceof File ? URL.createObjectURL(file) : file
                    }
                    alt="Preview"
                  />
                ))}
              </div>
            )}
            {blogData.blog_image_url && blogData.blog_image_url.length > 0 && (
              <div>
                <button
                  className="deletePhoto"
                  type="button"
                  onClick={handleDeleteImage}
                >
                  Eliminar foto
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="title">
            Título: <span>(de 5 a 100 caracteres)</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={blogData.title}
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="tags">
            Etiquetas <span>(separadas por comas)</span>
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={blogData.tags}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group2">
          <label htmlFor="blog_description">Descripción:</label>
          <textarea
            name="blog_description"
            id="blog_description"
            value={blogData.blog_description}
            onChange={(e) => handleChange(e)}
            ref={blogDescriptionRef}
            required
          />
          {errors.blog_description && (
            <p className="error-message">{errors.blog_description}</p>
          )}
        </div>
        <div className="section-group">
          <h3>Secciones:</h3>
          {blogData.sections.map((section, index) => (
            <div key={index} className="section">
              <label htmlFor={`section_title_${index}`}>
                Título de la sección:
              </label>
              <input
                type="text"
                name={`section_title_${index}`}
                id={`section_title_${index}`}
                value={section.title}
                onChange={(e) => handleChange(e, index, "title")}
              />
              {errors[`sections[${index}].title`] && (
                <p className="error-message">
                  {errors[`sections[${index}].title`]}
                </p>
              )}
              <div className="form-group">
                <label htmlFor={`section_content_${index}`}>
                  Contenido de la sección:
                </label>
                {section.content.map((item, listIndex) => (
                  <div key={listIndex} className="list-item">
                    <textarea
                      name={`section_content_${index}_${listIndex}`}
                      id={`section_content_${index}_${listIndex}`}
                      value={item}
                      ref={blogDescriptionRef}
                      onChange={(e) =>
                        handleChange(e, index, "content", listIndex)
                      }
                      placeholder="Puedes agregar otro párrafo si deseas, es opcional"
                      required
                    />
                    <div>
                      <AiFillDelete
                        onClick={() => removeContent(index, listIndex)}
                        className="eraseContent"
                      />
                    </div>
                    {errors[`sections[${index}].content`] && (
                      <p className="error-message">
                        {errors[`sections[${index}].content`]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <label htmlFor={`section_list_${index}`}>
                Lista de la sección:
              </label>
              <div className="section-list">
                {section.list.map((item, listIndex) => (
                  <div key={listIndex} className="list-item">
                    <textarea
                      name={`section_list_${index}_${listIndex}`}
                      id={`section_list_${index}_${listIndex}`}
                      value={item}
                      ref={blogDescriptionRef}
                      onChange={(e) =>
                        handleChange(e, index, "list", listIndex)
                      }
                      className="listElements"
                      placeholder="Puedes agregar una lista si deseas, es opcional"
                    />
                    <div>
                      <AiFillDelete
                        className="eraseContent"
                        onClick={() => removeList(index, listIndex)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {blogData.sections.length > 1 && (
                <button
                  className="delete"
                  type="button"
                  onClick={() => removeSection(index)}
                >
                  Eliminar Sección
                </button>
              )}
            </div>
          ))}
          <div className="buttons-container">
            <button
              type="button"
              className="add-section-btn"
              onClick={addSection}
            >
              Sección
            </button>
            {blogData.sections.length > 0 && (
              <button
                type="button"
                className="add-list-btn"
                onClick={() => addListToSection(blogData.sections.length - 1)}
              >
                Lista
              </button>
            )}
            {blogData.sections.length > 0 && (
              <button
                type="button"
                className="add-content-btn"
                onClick={() =>
                  addContentToSection(blogData.sections.length - 1)
                }
              >
                Párrafo
              </button>
            )}
          </div>
        </div>
        <button type="submit" className="submit-btn">
          {manageButtonInfo ? (
            <>
            <span>Creando Blog</span>
            <span style={{ marginRight: '10px' }}> <CircularProgress color="inherit" size={15}/></span>
            </>
          ) : (
           <span>Crear Blog</span>
           
          )}
        </button>

        <div className="messageFetch">
          {manageButtonInfo && !showTimeoutMessage && (
            <p className="waitingServer">Enviando solicitud...</p>
          )}
          {showTimeoutMessage && (
            <p className="serverTimeout">Servidor apagado, espera...</p>
          )}
          {data && !data.error && (
            <p className="fetchSuccess">Blog creado exitosamente.</p>
          )}
          {data && data.error && <p className="fetchError">{data.error}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
