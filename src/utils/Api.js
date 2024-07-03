const API_BASE_URL = 'https://obbaramarket-backend.onrender.com';
  
export const fetchBlogs = async () => {
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/ObbaraMarket/blogs`);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos de los blogs:', error);
      throw error;
    }
  };

export const fetchAuthor = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ObbaraMarket/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos del autor:', error);
      throw error;
    }
  };


  