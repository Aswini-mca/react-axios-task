import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { API } from '../global.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export function AddUser() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/all`)
      .then((response) => {
        setData(response.data.data);
      });
  }, [])

  const validationSchema = Yup.object({
    id: Yup.number().required('ID is required & it should be number'),
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required & it should be number'),
    email: Yup.string().required('E-mail is required'),
    phone: Yup.number().required('Phone number is required & it should be numbers'),
    address: Yup.string().required('Address is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      age: '',
      email: '',
      phone: '',
      address: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newuser = {
        "id": values.id,
        "name": values.name,
        "age": values.age,
        "email": values.email,
        "phone": values.phone,
        "address": values.address
      };

      axios.post(`${API}/add`, newuser)
        .then((response) => {
          setData(response.data.data)
          setData(...data, newuser);
          alert("New user Added successfully");
          navigate("/user-list");

        });
    },
  })

  return (
    <div>
      <div className="mb-4">
        <h2 className="container m-3 text-center">Fill this input fields and click Add User button to add new user</h2>
        <Link className='text-dark head' to={'/'}>Home</Link>
      </div>
      <div className='container'>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-3' title="User Id">
            <input
              className='form-control'
              type='text'
              placeholder='User Id'
              name='id'
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.id && formik.errors.id ? (
              <div className='text-danger m-2'>*{formik.errors.id}</div>
            ) : null}
          </div>
          <div className='mb-3' title="Name">
            <input
              className='form-control'
              type='text'
              placeholder='Name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-danger m-2'>*{formik.errors.name}</div>
            ) : null}
          </div>
          <div className='mb-3' title="Age">
            <input
              className='form-control'
              type='text'
              placeholder='Age'
              name='age'
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age ? (
              <div className='text-danger m-2'>*{formik.errors.age}</div>
            ) : null}
          </div>
          <div className='mb-3' title="E-mail">
            <input
              className='form-control'
              type='email'
              placeholder='E-mail'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-danger m-2'>*{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='mb-3' title="Phone">
            <input
              className='form-control'
              type='text'
              placeholder='Phone Number'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className='text-danger m-2'>*{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className='mb-3' title='Address'>
            <input
              className='form-control'
              type='text'
              placeholder='Address'
              name='address'
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className='text-danger m-2'>*{formik.errors.address}</div>
            ) : null}
          </div>
          <button className='btn btn-success'>Add User</button>
        </form>
      </div>
    </div>
  );
}
