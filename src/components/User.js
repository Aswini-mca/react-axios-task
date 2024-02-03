import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../global.js'

//User Component
export function User() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const getUsers = async () => {
    try {
      const response = await axios.get(`${API}/all`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => { getUsers(); }, []);

  const navigate = useNavigate();
  
  const spinner = () => {
    if (loading)
      return (
        <div class="spinner-border text-secondary m-4" role="status">
          <span class="visually-hidden">Loading...</span> </div>
      )
  }

  return (
    <div>
      <div>
        <h4 className="container m-3 text-center">Welcome to our User List Page, where you can explore and manage your community effortlessly.</h4>
        <Link className='text-dark head' to={'/'}>Home</Link>
      </div>
      <button className='btn btn-success' onClick={() => navigate("/add-user")}>Add User</button>
      <p>{spinner()}</p>
      <div className='user-card'>
        {Array.isArray(data) && data.map((user) => {
          return (
            <div key={user.id}
              className="User-list p-4 m-4"
              style={{
                width: "20em",
                backgroundColor: "#aaa7ab",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p style={{ fontSize: 20, color: 'black' }}><b>Id:</b> {user.id}</p>
              <p className='list-align' style={{ fontSize: 20, color: 'white' }}>User Name: {user.name}</p>
              <p className='list-align' style={{ fontSize: 20, color: 'white' }}>Age: {user.age}</p>
              <p className='list-align' style={{ fontSize: 20, color: 'white' }}>E-mail: {user.email}</p>
              <p className='list-align' style={{ fontSize: 20, color: 'white' }}>Phone: {user.phone}</p>
              <p className='list-align' style={{ fontSize: 20, color: 'white' }}>Address:  {user.address}</p>
              <button className='btn btn-warning' onClick={() => navigate(`/edit-user/${user.id}`)}>Edit User</button>
              <button className='btn btn-danger' onClick={() => {
                axios.delete(`${API}/delete/${user.id}`)
                  .then(() => {
                    getUsers();
                    console.log(`deleted user id ${user.id}`);
                    alert(`Deleted UserId ${user.id} Successfully`);
                  });
              }}>Delete User</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
