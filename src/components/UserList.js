import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import { fetchUsers, deleteUser } from '../services/api';
import './UserList.css'; // We'll create this CSS file next

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
      // Implement user creation logic here
      await loadUsers(); // Reload the list after creating
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      await loadUsers(); // Reload the list after deleting
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-management">
      <div className="user-form-container">
        <h2>Add New User</h2>
        <UserForm onSave={handleCreateUser} />
      </div>
      <div className="user-list-container">
        <h2>Beta Users</h2>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.rowKey} className="user-item">
              <span className="user-email">{user.email}</span>
              <span className="user-approved">{user.isApproved ? 'Approved' : 'Not Approved'}</span>
              <button 
                className="delete-button" 
                onClick={() => handleDeleteUser(user.rowKey)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;