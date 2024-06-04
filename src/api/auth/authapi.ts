import apiClient from "../config/apiclient";

//funciones de administrador
// Login function (existing)
export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

export const getAuth = async (token: string, authID: number) => {
  const response = await apiClient.get(`/usuario/${authID}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
   return response.data;
}
//todas las funciones de aqui van para los usuarios que estan en la app.
//traer a los usuarios registrados en la app
export const getUser = async (token: string) => {
  const response = await apiClient.get('/pos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const UserByID = async (token: string, userID: number) => {
  const response = await apiClient.get(`/pos/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const deleteUser = async (token: string, userID: number) =>{
  const response = await apiClient.delete(`/pos/${userID}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
