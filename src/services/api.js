const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:7071/api';
const API_KEY = process.env.REACT_APP_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, { headers });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers,
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return response.json();
};