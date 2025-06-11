import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import DeleteUser from './DeleteUser';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // TODO: Implement API call to fetch users
    // For now, we'll use dummy data
    setUsers([
      { id: '1', email: 'user1@example.com', isApproved: true },
      { id: '2', email: 'user2@example.com', isApproved: false },
    ]);
  };

  return (
    <div>
      <h2>Beta Users</h2>
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
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.isApproved ? 'Yes' : 'No'}</td>
              <td>
                <UserForm user={user} onSave={fetchUsers} />
                <DeleteUser userId={user.id} onDelete={fetchUsers} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserForm onSave={fetchUsers} />
    </div>
  );
};

export default UserList;