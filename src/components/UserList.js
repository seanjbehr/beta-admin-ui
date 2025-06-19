import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/api';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      loadUsers();
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      await updateUser(id, userData);
      loadUsers();
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Beta Users</h2>
      <UserForm onSave={handleCreateUser} />
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.rowKey}>
              <td>{user.email}</td>
              <td>{user.isApproved ? 'Yes' : 'No'}</td>
              <td>
                <UserForm user={user} onSave={(userData) => handleUpdateUser(user.rowKey, userData)} />
                <button onClick={() => handleDeleteUser(user.rowKey)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;