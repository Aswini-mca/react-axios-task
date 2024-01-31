import { useNavigate } from 'react-router-dom';

//Home Component
export function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA6Mt6umOJFqybBxmeb46ptde7dCGP-XJnXA&usqp=CAU' width="400" alt='...' />
      <div className='m-4 p-4'>
      <p className='container head'>Fetch data from an API using Axios with this User App.
        This app allows users to perform CRUD (Create, Read, Update, Delete) operations effortlessly, offering a smooth and efficient way to interact with your data.</p>
      <button className='btn btn-success' onClick={() => navigate("/user-list")}>User List</button>
      <button className='btn btn-success' onClick={() => navigate("/add-user")}>Add User</button>
      </div>
    </div>
  );
}
