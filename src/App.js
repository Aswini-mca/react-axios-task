import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AddUser } from './components/AddUser.js';
import { EditUser } from './components/EditUser.js';
import { Home } from './components/Home.js';
import { User } from './components/User.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-list" element={<User />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:userid" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;


