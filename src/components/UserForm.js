import React, { useState } from 'react';
import { createUser, updateUser } from '../services/api';
import './UserForm.css'; // Create this file for UserForm specific styles

const UserForm = ({ user, onSave }) => {
  const [email, setEmail] = useState(user ? user.email : '');
  const [isApproved, setIsApproved] = useState(user ? user.isApproved : false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (user) {
        await updateUser(user.rowKey, { email, isApproved });
      } else {
        await createUser({ email, isApproved });
      }
      onSave();
      if (!user) {
        // Clear form after successful addition
        setEmail('');
        setIsApproved(false);
      }
    } catch (err) {
      setError('Failed to save user. Please try again.');
      console.error('Error saving user:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <label>
        <input
          type="checkbox"
          checked={isApproved}
          onChange={(e) => setIsApproved(e.target.checked)}
        />
        Approved
      </label>
      <button type="submit">{user ? 'Update' : 'Add'} User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UserForm;