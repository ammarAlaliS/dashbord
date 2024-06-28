import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const CreateBlog = ({ blogData, onChange }) => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const blogDescriptionRef = useRef(null);

  useEffect(() => {
    ajustarAlturaTextarea();
    blogData.sections.forEach((_, index) => {
      ajustarAlturaTextareaSeccion(index);
    });
  }, [blogData.blog_description, blogData.sections]);

  const ajustarAlturaTextarea = () => {
    const { current } = blogDescriptionRef;
    if (current) {
      current.style.height = "auto";
      current.style.height = `${current.scrollHeight}px`;
    }
  };

  const ajustarAlturaTextareaSeccion = (index) => {
    const textareaId = `section_content_${index}`;
    const textarea = document.getElementById(textareaId);
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (e, index = null, campo = null) => {
    const { name, value, files } = e.target;
    if (index === null) {
      if (name === "blog_image_url") {
        onChange({
          ...blogData,
          [name]: files[0], // Asignar directamente el archivo seleccionado
        });
      } else {
        onChange({
          ...blogData,
          [name]: value,
        });
      }
    } else {
      const seccionesActualizadas = [...blogData.sections];
      seccionesActualizadas[index][campo] = value;
      onChange({
        ...blogData,
        sections: seccionesActualizadas,
      });

      if (campo === "content") {
        ajustarAlturaTextareaSeccion(index);
      }
    }

    if (name === "blog_description") {
      ajustarAlturaTextarea();
    }
  };

  const agregarSeccion = () => {
    onChange({
      ...blogData,
      sections: [...blogData.sections, { title: "", content: [], list: [] }],
    });
  };

  const agregarListaSeccion = (index) => {
    const seccionesActualizadas = [...blogData.sections];
    seccionesActualizadas[index].list.push("");
    onChange({
      ...blogData,
      sections: seccionesActualizadas,
    });
  };

  const agregarContenidoSeccion = (index) => {
    const seccionesActualizadas = [...blogData.sections];
    seccionesActualizadas[index].content.push("");
    onChange({
      ...blogData,
      sections: seccionesActualizadas,
    });
  };

  const handleChangeLista = (e, index, indexLista) => {
    const { value } = e.target;
    const seccionesActualizadas = [...blogData.sections];
    seccionesActualizadas[index].list[indexLista] = value;
    onChange({
      ...blogData,
      sections: seccionesActualizadas,
    });
  };

  const handleChangeContenido = (e, index, indexLista) => {
    const { value } = e.target;
    const seccionesActualizadas = [...blogData.sections];
    seccionesActualizadas[index].content[indexLista] = value;
    onChange({
      ...blogData,
      sections: seccionesActualizadas,
    });

    ajustarAlturaTextareaSeccion(index); // Ajustar altura al cambiar contenido
  };

  const eliminarSeccion = (index, indexLista = null) => {
    const seccionesActualizadas = [...blogData.sections];
    if (indexLista !== null) {
      seccionesActualizadas[index].list.splice(indexLista, 1);
    } else {
      seccionesActualizadas.splice(index, 1);
    }
    onChange({
      ...blogData,
      sections: seccionesActualizadas,
    });
  };

  const limpiarFormulario = () => {
    onChange({
      blog_image_url: "", // Limpiar la URL de la imagen al limpiar el formulario
      title: "",
      tags: "",
      blog_description: "",
      sections: [{ title: "", content: [], list: [] }],
    });
    ajustarAlturaTextarea();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado.");
      return;
    }

    if (!validarFormulario()) {
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
        section.content.forEach((item, indexLista) => {
          formData.append(`sections[${index}][content][${indexLista}]`, item);
        });
        section.list.forEach((item, indexLista) => {
          formData.append(`sections[${index}][list][${indexLista}]`, item);
        });
      });

      const response = await axios.post(
        "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/create/blog",
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
      limpiarFormulario();
    } catch (error) {
      console.error("Error al crear el blog:", error);
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
  };

  const validarFormulario = () => {
    const { title, blog_description, sections } = blogData;
    const nuevosErrores = {};

    // Validación del título
    if (!title || title.length < 5 || title.length > 100) {
      nuevosErrores.title = "El título debe tener entre 5 y 100 caracteres.";
    }

    // Validación de la descripción del blog
    if (!blog_description || blog_description.length < 10) {
      nuevosErrores.blog_description =
        "La descripción del blog debe tener al menos 10 caracteres.";
    }

    // Actualizar el estado de los errores
    setErrors(nuevosErrores);

    // El formulario es válido si no hay errores
    return Object.keys(nuevosErrores).length === 0;
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
            {blogData.blog_image_url && (
              <img
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                src={
                  blogData.blog_image_url instanceof File
                    ? URL.createObjectURL(blogData.blog_image_url)
                    : blogData.blog_image_url
                }
                alt="Preview"
              />
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
              />
              {errors[`sections[${index}].title`] && (
                <p className="error-message">
                  {errors[`sections[${index}].title`]}
                </p>
              )}
              <label htmlFor={`section_content_${index}`}>
                Contenido de la sección:
              </label>
              <div className="section-list">
                {Array.isArray(section.content) &&
                  section.content.map((item, listIndex) => (
                    <div key={listIndex} className="list-item">
                      <textarea
                        name={`section_content_${index}_${listIndex}`}
                        id={`section_content_${index}_${listIndex}`}
                        value={item}
                        onChange={(e) =>
                          handleChangeContenido(e, index, listIndex)
                        }
                        placeholder="Puedes agregar otro párrafo si deseas, es opcional"
                        ref={blogDescriptionRef}
                        required
                      />
                    </div>
                  ))}
              </div>
              <label htmlFor={`section_list_${index}`}>
                Lista de la sección:
              </label>
              <div className="section-list">
                {Array.isArray(section.list) &&
                  section.list.map((item, listIndex) => (
                    <div key={listIndex} className="list-item">
                      <input
                        type="text"
                        name={`section_list_${index}_${listIndex}`}
                        id={`section_list_${index}_${listIndex}`}
                        value={item}
                        onChange={(e) => handleChangeLista(e, index, listIndex)}
                        ref={blogDescriptionRef}
                        placeholder="Puedes agregar una lista si deseas, es opcional"
                      />
                    </div>
                  ))}
              </div>
              {errors[`sections[${index}].content`] && (
                <p className="error-message">
                  {errors[`sections[${index}].content`]}
                </p>
              )}
              {blogData.sections.length > 1 && (
                <button
                  className="delete"
                  type="button"
                  onClick={() => eliminarSeccion(index)}
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
              onClick={agregarSeccion}
            >
              Sección
            </button>
            {blogData.sections.length > 0 && (
              <button
                type="button"
                className="add-list-btn"
                onClick={() =>
                  agregarListaSeccion(blogData.sections.length - 1)
                }
              >
                Lista
              </button>
            )}
            {blogData.sections.length > 0 && (
              <button
                type="button"
                className="add-content-btn"
                onClick={() =>
                  agregarContenidoSeccion(blogData.sections.length - 1)
                }
              >
                Párrafo
              </button>
            )}
          </div>
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
