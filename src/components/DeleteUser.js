import React from 'react';

const DeleteUser = ({ userId, onDelete }) => {
  const handleDelete = async () => {
    // TODO: Implement API call to delete user
    console.log('Deleting user:', userId);
    onDelete();
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteUser;