import React, { useState,useEffect } from 'react'
import "./Adminhome.css"
import axios from "axios"
import { Link,useNavigate } from 'react-router-dom'
export default function Adminhome() {
    const navigate=useNavigate()
//     const [admind,setadmind]=useState('');
    var admin;

// setadmind(admin)
const logout=()=>{
    navigate('/')
}

admin=localStorage.getItem("adminlogin");
const [data, setData] = useState([]);



const loadData = async () => {
    const response = await axios.post("http://localhost:5000/admin/get");
    console.log("========>",response.data.data);
    setData(response.data.data);
  };
  useEffect(() => {
    loadData();
  }, []);


  return (
    <div>
           <div className="header" style={{display:"flex",backgroundColor:"#0000ff",padding:"10px",justifyContent:"space-between",color:"white"}}>
        <Link to={"/home"} style={{color:"white"}}>Admin Page</Link>

        <div onClick={logout} className="logout" style={{cursor:"pointer"}}>
          Logout
        </div>
      </div>
      <h1 style={{textAlign:"center"}}>Welcome{admin}</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Marks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {

            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.marks != null ? item.marks:'Not Attend or Re-exam' }</td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
