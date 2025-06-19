import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import DeleteUser from './DeleteUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
    // TODO: Implement API call to fetch users
    // For now, we'll use dummy data
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUsers([
      { id: '1', email: 'user1@example.com', isApproved: true },
      { id: '2', email: 'user2@example.com', isApproved: false },
    ]);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

    const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

    if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h2>Beta Users</h2>
      <table style ={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Email</th>
            <th style={thTdStyle}>Approved</th>
            <th style={thTdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={thTdStyle}>{user.email}</td>
              <td style={thTdStyle}>{user.isApproved? 'Yes' : 'No'}</td>
              <td style={thTdStyle}>
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