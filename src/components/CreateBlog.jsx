import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
    const [blogData, setBlogData] = useState({
        blog_image_url: '',
        title: '',
        tags: '',
        blog_description: '',
        sections: [{ title: '', content: '' }]
    });

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (index === null) {
            setBlogData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            const updatedSections = [...blogData.sections];
            updatedSections[index][name] = value;
            setBlogData(prevState => ({
                ...prevState,
                sections: updatedSections
            }));
        }
    };

    const handleSectionAdd = () => {
        setBlogData(prevState => ({
            ...prevState,
            sections: [...prevState.sections, { title: '', content: '' }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('blog_image_url', blogData.blog_image_url); 
            formData.append('title', blogData.title);
            formData.append('tags', blogData.tags);
            formData.append('blog_description', blogData.blog_description);
            
            blogData.sections.forEach((section, index) => {
                formData.append(`sections[${index}][title]`, section.title);
                formData.append(`sections[${index}][content]`, section.content);
            });
    
            // Verifica que la imagen esté correctamente cargada antes de enviarla
            console.log(formData.get('blog_image_url'));
    
            const response = await axios.post('https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket/create/blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            console.log('Blog creado:', response.data);
        } catch (error) {
            console.error('Error al crear el blog:', error);
            if (error.response) {
                console.error('Detalles del error:', error.response.data);
            }
        }
    };
    

    return (
        <div className="create-blog-container">
            <h2>Crear Nuevo Blog</h2>
            <form className="blog-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="blog_image_url">Imagen:</label>
                    <input type="file" name="blog_image_url" id="blog_image_url" onChange={(e) => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Título:</label>
                    <input type="text" name="title" id="title" value={blogData.title} onChange={(e) => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Etiquetas <span>(separados por comas)</span></label>
                    <input type="text" name="tags" id="tags" value={blogData.tags} onChange={(e) => handleChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor="blog_description">Descripción:</label>
                    <input type='text' name="blog_description" id="blog_description" value={blogData.blog_description} onChange={(e) => handleChange(e)} required />
                </div>
                <div className="section-group">
                    <h3>Secciones:</h3>
                    {blogData.sections.map((section, index) => (
                        <div key={index} className="section">
                            <label htmlFor={`section_title_${index}`}>Título de la sección:</label>
                            <input type="text" name="title" id={`section_title_${index}`} value={section.title} onChange={(e) => handleChange(e, index)} required />
                            <label htmlFor={`section_content_${index}`}>Contenido de la sección:</label>
                            <textarea name="content" id={`section_content_${index}`} value={section.content} onChange={(e) => handleChange(e, index)} required />
                        </div>
                    ))}
                    <button type="button" className="add-section-btn" onClick={handleSectionAdd}>Agregar Sección</button>
                </div>
                <button type="submit" className="submit-btn">Crear Blog</button>
            </form>
        </div>
    );
}
export default CreateBlog;
