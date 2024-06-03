import apiClient from "../config/apiclient";

// Login function (existing)
export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

// New function to get user details based on token
export const getUser = async (token: string) => {
  const response = await apiClient.get('/pos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
