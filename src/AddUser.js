import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export function AddUser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://64fb003ecb9c00518f7a7f53.mockapi.io/users")
      .then((response) =>
        setData(response.data));
  }, [])
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const navigate = useNavigate();
  return (
    <div>
      <h2 className="container m-3 text-center">Fill this input fields and click Add User button to add new user</h2>
      <div className='container'>
        <input className="form-control" type="text" placeholder="ID" onChange={(e) => setId(e.target.value)} value={id}></input><br />
        <input className="form-control" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name}></input><br />
        <input className="form-control" type="text" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}></input><br />
        <input className="form-control" type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone}></input><br />
        <input className="form-control" type="text" placeholder="Website" onChange={(e) => setWebsite(e.target.value)} value={website}></input><br />
        <button className='btn btn-success' onClick={() => {
          const newuser = {
            "id": id,
            "name": name,
            "email": email,
            "phone": phone,
            "website": website
          };

          axios.post("https://64fb003ecb9c00518f7a7f53.mockapi.io/users", newuser)
            .then((response) => {
              setData(response.data)
              setData(...data, newuser);
              console.log(response);
              alert("New user Added");
            }).then(() => {
              console.log(data);
              navigate("/user-list");
            });

        }
        }
        >Add User</button>
      </div>
    </div>
  );
}
