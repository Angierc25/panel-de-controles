import apiClient from "../config/apiclient";

// Login function (existing)
export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

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

