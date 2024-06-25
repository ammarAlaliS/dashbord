import React, { useState, useRef } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    blog_image_url: "",
    title: "",
    tags: "",
    blog_description: "",
    sections: [{ title: "", content: "" }],
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const blogDescriptionRef = useRef(null);

  const adjustTextareaHeight = () => {
    const { current } = blogDescriptionRef;
    if (current) {
      current.style.height = "auto";
      current.style.height = `${current.scrollHeight}px`;
    }
  };

  const handleChange = (e, index = null, field = null) => {
    const { name, value, files } = e.target;
    if (index === null) {
      if (name === "blog_image_url") {
        setBlogData((prevState) => ({
          ...prevState,
          [name]: files[0],
        }));
      } else {
        setBlogData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      const updatedSections = [...blogData.sections];
      updatedSections[index][field] = value;
      setBlogData((prevState) => ({
        ...prevState,
        sections: updatedSections,
      }));
    }

    if (name === "blog_description") {
      adjustTextareaHeight();
    }
  };

  const handleSectionAdd = () => {
    setBlogData((prevState) => ({
      ...prevState,
      sections: [...prevState.sections, { title: "", content: "" }],
    }));
  };

  const handleSectionRemove = (index) => {
    const updatedSections = [...blogData.sections];
    updatedSections.splice(index, 1);
    setBlogData((prevState) => ({
      ...prevState,
      sections: updatedSections,
    }));
  };

  const clearForm = () => {
    setBlogData({
      blog_image_url: "",
      title: "",
      tags: "",
      blog_description: "",
      sections: [{ title: "", content: "" }],
    });
    adjustTextareaHeight();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si hay token antes de continuar
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado.");
      // Manejar el caso donde el token no está presente, por ejemplo, redirigir a la página de inicio de sesión
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("blog_image_url", blogData.blog_image_url);
      formData.append("title", blogData.title);
      formData.append("tags", blogData.tags);
      formData.append("blog_description", blogData.blog_description);

      blogData.sections.forEach((section, index) => {
        formData.append(`sections[${index}][title]`, section.title);
        formData.append(`sections[${index}][content]`, section.content);
      });

      const response = await axios.post(
        "https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket/create/blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Blog creado:", response.data);
      setSuccessMessage("¡Blog creado exitosamente!");
      clearForm();
    } catch (error) {
      console.error("Error al crear el blog:", error);
      if (error.response) {
        console.log(error.response.data); // Mostrar detalle del error del servidor
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
  };

  const validateForm = () => {
    const { title, blog_description, sections } = blogData;
    const newErrors = {};

    // Validación del título
    if (!title || title.length < 5 || title.length > 100) {
      newErrors.title = "El título debe tener entre 5 y 100 caracteres.";
    }

    // Validación de la descripción del blog
    if (!blog_description || blog_description.length < 10) {
      newErrors.blog_description =
        "La descripción del blog debe tener al menos 10 caracteres.";
    }

    // Validación de las secciones
    sections.forEach((section, index) => {
      if (
        !section.title ||
        section.title.length < 5 ||
        section.title.length > 100
      ) {
        newErrors[`sections[${index}].title`] =
          "El título de la sección debe tener entre 5 y 100 caracteres.";
      }
      if (!section.content || section.content.length < 10) {
        newErrors[`sections[${index}].content`] =
          "El contenido de la sección debe tener al menos 10 caracteres.";
      }
    });

    // Actualizar el estado de los errores
    setErrors(newErrors);

    // El formulario es válido si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="create-blog-container">
      <h2>Crear Nuevo Blog</h2>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="blog_image_url">Imagen:</label>
          <div className="file-and-img">
            <input
              type="file"
              name="blog_image_url"
              id="blog_image_url"
              onChange={(e) => handleChange(e)}
              required
              placeholder="Selecciona una imagen..."
              className="file"
            />
            <img
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              src={
                blogData.blog_image_url instanceof File
                  ? URL.createObjectURL(blogData.blog_image_url)
                  : blogData.blog_image_url
              }
              alt=""
            />
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
        <div className="form-group">
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
                required
              />
              {errors[`sections[${index}].title`] && (
                <p className="error-message">
                  {errors[`sections[${index}].title`]}
                </p>
              )}
              <label htmlFor={`section_content_${index}`}>
                Contenido de la sección:
              </label>
              <textarea
                name={`section_content_${index}`}
                id={`section_content_${index}`}
                value={section.content}
                onChange={(e) => handleChange(e, index, "content")}
                required
              />
              {errors[`sections[${index}].content`] && (
                <p className="error-message">
                  {errors[`sections[${index}].content`]}
                </p>
              )}
              {blogData.sections.length > 1 && (
                <button
                  className="delete"
                  type="button"
                  onClick={() => handleSectionRemove(index)}
                >
                  Eliminar Sección
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-section-btn"
            onClick={handleSectionAdd}
          >
            Agregar Sección
          </button>
        </div>
        <button type="submit" className="submit-btn">
          Crear Blog
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.global && <p className="error-message">{errors.global}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
