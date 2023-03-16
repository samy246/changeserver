import React, { useState,useRef,useEffect } from "react";
import { Button } from "bootstrap";
import "./style.css";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

const Registerform=()=> {
const navigate=useNavigate()
const arrayRef = useRef([]);
const [value, setValue] = useState([])

const [allEvent, setAllEvents] = useState([]);
const [newEvent, setNewEvent] = useState({
  usernameReg: "",
  emailReg: "",
  passwordReg: "",

  contactReg: "",
  dept:"",
  dob:"",
  clg:"",
year:""

});

const loadData = async () => {
  const response = await axios.post("http://localhost:5000/examreg/get");
  console.log("========>",response.data.data);
  setAllEvents(response.data.data);
};
useEffect(() => {
  loadData();
}, []);
//const [newuser,setAllnewuser]=useState()
//   const [usernameReg, setUsernameReg] = useState("");
//   const [passwordReg, setPasswordReg] = useState("");
//   const [emailReg, setEmailReg] = useState("");
//   const [contactReg, setContactReg] = useState("");

// let arr=[];

const validate=()=>{
  let proceed = true;
  let errormsg = " Please ";
  if (newEvent.usernameReg == "") {
    proceed = false;
    errormsg += " Enter Your Name";
  }
  if (newEvent.emailReg == "") {
    proceed = false;
    errormsg += " Enter Your Email ID";
  }
  if (newEvent.passwordReg == "") {
    proceed = false;
    errormsg += " Enter Your Password";
  }
  if (newEvent.contactReg == "") {
    proceed = false;
    errormsg += " Enter Your Contact No";
  }
  if (newEvent.dept == "") {
    proceed = false;
    errormsg += " Enter Your Dept";
  }

  if (newEvent.dob == "") {
    proceed = false;
    errormsg += " Enter Your DOB";
  }
  if (newEvent.clg == "") {
    proceed = false;
    errormsg += " Enter Your College";
  }
  if (newEvent.year == "") {
    proceed = false;
    errormsg += " Select Your Passed Year";
  }




  if (!proceed) {
    toast.error(errormsg);
  }else {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newEvent.emailReg)) {
    } else {
      proceed = false;
      toast.warning("Please Enter the Valid Email");
    }
    if (/^([+]\d{2})?\d{10}$/.test(newEvent.contactReg)) {
    } else {
      proceed = false;
      toast.warning("Please Enter the Valid ContactNo");
    }
  }
  return proceed;
}

 //validate duplicate regsiter
 const duplicatevalidate = () => {
   console.log(allEvent);
  let ok = true;
  for (var i = 0; i < allEvent.length; i++) {

    if (
      newEvent.usernameReg === allEvent[i].name
    ) {
      toast.warning(
        "You Already Registered Name'" +
        newEvent.usernameReg +
          "' Please Login"
      );
      ok = false;
    }
    // if (
    //   newEvent.email === arr[i].email
    //   ) {
    //     toast.warning(
    //       "You Already Registered Email'" +
    //       newEvent.email +
    //         "' Please Login"
    //     );
    //     ok = false;
    //   }
  }
  return ok;
};

  const register = () => {

if(validate()){
 if(duplicatevalidate()){

console.log(newEvent);



  axios.post("http://localhost:5000/examregister",

   newEvent

  ).then((response)=>{
    console.log(response);
    if(response.data.message){

      toast.error("Register Failed :| "+response.data.message)
      console.log('if ');
        }else{
          console.log('else',response);
          //setloginstatus(response.data[0].username)
          toast.success("Successfully Registered :) " + newEvent.usernameReg);






        }
  })





 // toast.success("Registered Successfully");
 console.log("form data",newEvent)
 setAllEvents([...allEvent, newEvent]);
 setNewEvent({  usernameReg: "",passwordReg: "",emailReg: "",contactReg: "",dept:"",dob:"",clg:"",year:"" });
 navigate('/login')
 }
}


  };

  return (
    <div class="main">

      <h1 style={{ textAlign: "center" }}>Welcome To Online Exam</h1>
      <section class="signup">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Sign up</h2>
              <form method="POST" class="register-form" id="register-form">
                <div class="form-group">
                  <label for="name">
                    <i class="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={newEvent.usernameReg}
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, usernameReg: e.target.value })
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="email">
                    <i class="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={newEvent.emailReg}
                    placeholder="Your Email"
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, emailReg: e.target.value })
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="pass">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                    value={newEvent.passwordReg}
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, passwordReg: e.target.value })
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="re-pass">
                    <i class="zmdi zmdi-phone"></i>
                  </label>
                  <input
                    type="text"
                    name="re_pass"
                    id="re_pass"
                    value={newEvent.contactReg}
                    placeholder="Contact Number"
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, contactReg: e.target.value })
                    }}
                  />
                </div>

                <div class="form-group">
                  <label for="re-pass">
                  <i class="zmdi zmdi-accounts-add"></i>
                  </label>
                  <input
                    type="text"
                    name="dept"
                    id="dept"
                    value={newEvent.dept}
                    placeholder="Department"
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, dept: e.target.value })
                    }}
                  />
                </div>


                <div class="form-group">
                  <label for="re-pass">
                  <i class="zmdi zmdi-calendar-check"></i>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={newEvent.dob}
                    placeholder="Date-Of-Birth"
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, dob: e.target.value })
                    }}
                  />
                </div>
                <div class="form-group">
                  <label for="re-pass">
                  <i class="zmdi zmdi-graduation-cap"></i>
                  </label>
                  <input
                    type="text"
                    name="clg"
                    id="clg"
                    value={newEvent.clg}
                    placeholder="College Name"
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, clg: e.target.value })
                    }}
                  />
                </div>

                <div class="form-group">
                  <label for="re-pass">
                  <i class="zmdi zmdi-calendar-note"></i>
                  </label>

                  <select class="form-control"
                    name="year"
                    id="year"
                   onChange={(e) => {
                      setNewEvent({ ...newEvent, year: e.target.value })
                    }} >
                    <option value=" ">--Select Passed Out Year--</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>

                </div>
                {/* <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div> */}
                <div class="form-group form-button">
                  <input
                    type="button"
                    name="signup"
                    id="signup"
                    class="form-submit"
                    value="Register"
                    onClick={register}
                  />
                </div>
              </form>
            </div>
            <div class="signup-image">
              <figure>
                <img src="images/signup-image.jpg" alt="sing up image" />
              </figure>
              <Link to={"/login"}>
                <a href="#" class="signup-image-link">
                  I am already member
                </a>
              </Link>

              <Link to={"/admin"}>
                <a href="#" class="signup-image-link">
                  I am Admin
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registerform
