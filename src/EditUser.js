import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


export function EditUser() {
  const { userid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://64fb003ecb9c00518f7a7f53.mockapi.io/users/${userid}`)
      .then((response) => {
        setData(response.data);
        console.log(response);
      }
      );
  }, []);
  return data ? <Edituser userdata={data} /> : "Loading..."
}
function Edituser({ userdata }) {

  const { userid } = useParams();
  const [id, setId] = useState(userdata.id);
  const [name, setName] = useState(userdata.name);
  const [email, setEmail] = useState(userdata.email);
  const [phone, setPhone] = useState(userdata.phone);
  const [website, setWebsite] = useState(userdata.website);
  // console.log(userdata);
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="container m-3 text-center">Edit this input fields and click Edit User button</h2>
      <div className='container'>
        <input className="form-control" type="text" placeholder="ID" onChange={(e) => setId(e.target.value)} value={id}></input><br />
        <input className="form-control" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name}></input><br />
        <input className="form-control" type="text" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}></input><br />
        <input className="form-control" type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone}></input><br />
        <input className="form-control" type="text" placeholder="Website" onChange={(e) => setWebsite(e.target.value)} value={website}></input><br />
        <button className='btn btn-success' onClick={() => {
          const updateuser = {
            "id": id,
            "name": name,
            "email": email,
            "phone": phone,
            "website": website
          };
          console.log(updateuser);

          axios.put(`https://64fb003ecb9c00518f7a7f53.mockapi.io/users/${userid}`, updateuser)
            .then((response) => {
              console.log(response);
              alert(`UserId ${userid} is edited Successfully`);
              navigate("/user-list")
            });

        }
        }
        >Edit User</button>
      </div>
    </div>
  );
}
