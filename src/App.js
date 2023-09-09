import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AddUser } from './AddUser';
import { EditUser } from './EditUser';

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

//Home Component
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA6Mt6umOJFqybBxmeb46ptde7dCGP-XJnXA&usqp=CAU' width="400" alt='...' />
      <h2>Click this UserList button to get user data</h2>
      <button className='btn btn-success' onClick={() => navigate("/user-list")}>UserList</button>
    </div>
  );
}

//User Component
function User() {
  const [data, setData] = useState([]);
  const getUsers = () => {
    axios.get("https://64fb003ecb9c00518f7a7f53.mockapi.io/users")
      .then((response) =>
        setData(response.data));
  }
  useEffect(() => getUsers(), [])
  const navigate = useNavigate();
  return (
    <div>
      <button className='btn btn-success' onClick={() => navigate("/")}>Home Page</button>
      <button className='btn btn-success' onClick={() => navigate("/add-user")}>Add User</button>

      <div className='user-card'>
        {data.map((dataObj, userid) => {
          return (
            <div key={userid}
              className="User-list"
              style={{
                width: "20em",
                backgroundColor: "#aaa7ab",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p style={{ fontSize: 20, color: 'black' }}><b>Id:</b> {dataObj.id}</p>
              <p style={{ fontSize: 20, color: 'white' }}>User Name: {dataObj.name}</p>
              <p style={{ fontSize: 20, color: 'white' }}>E-mail: {dataObj.email}</p>
              <p style={{ fontSize: 20, color: 'white' }}>Phone: {dataObj.phone}</p>
              <p style={{ fontSize: 20, color: 'white' }}>Website:  {dataObj.website}</p>
              <button className='btn btn-warning' onClick={() => navigate(`/edit-user/${userid + 1}`)}>Edit User</button>
              <button className='btn btn-danger' onClick={() => {
                axios.delete(`https://64fb003ecb9c00518f7a7f53.mockapi.io/users/${userid + 1}`)
                  .then(() => {
                    getUsers();
                    console.log(`deleted user id ${userid + 1}`)
                    alert(`Deleted UserId ${userid + 1} Successfully`);
                  });
              }}>Delete User</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
