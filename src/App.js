import React from 'react';
import './App.css';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Beta Admin UI</h1>
      </header>
      <main>
        <UserList />
      </main>
    </div>
  );
}

export default App;