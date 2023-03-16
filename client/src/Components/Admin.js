import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from "axios"
import "./style.css"
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal"

const Admin=()=> {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

const navigate=useNavigate()
const validate=()=>{
    let proceed = true;
    let errormsg = " Please ";

    if (email == "") {
      proceed = false;
      errormsg += " Enter Your Email ID";
    }
    if (password == "") {
      proceed = false;
      errormsg += " Enter Your Password";
    }


    if (!proceed) {
      toast.error(errormsg);
    }
    return proceed;
}


const adminlogin=()=>{
    if(validate()){
      axios.post("http://localhost:5000/adminlogin",{
        email:email,
        password:password,
      }).then((response)=>{
        if(response.data.message){
        //setloginstatus(response.data.message);
  toast.error("Admin Login failed :| "+response.data.message)
  console.log('if ');
        }else{
          console.log('else');
          console.log("resposne",response);
          console.log("response.data[0]",response.data.data[0].email);
         // setloginstatus(response.data[0].staffname)
          toast.success("Successfully Login :) " +response.data.data[0].email)
         localStorage.setItem("adminlogin",response.data.data[0].email)
  navigate('/adminhome')
          // setstaffpassword
        //  localStorage.setItem("login",response.data.data[0].email)
        }
      })
    }

}
  return (
    <div className='main'>
        <h1 style={{textAlign:"center"}}>Admin</h1>
          <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="images/signin-image.jpg" alt="sing up image"/></figure>
                        <Link to={'/'}>
                        <a href="#" class="signup-image-link">Not Register?Create an account</a>
                        </Link>

                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Admin Sign In</h2>
                        <form method="POST" class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="your_name" id="your_name" placeholder="Your Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail( e.target.value )
                                  }
                                />
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password"

                                value={password}
                                onChange={(e) =>
                                    setPassword( e.target.value )
                                  }
                                />
                            </div>

                            <div class="form-group form-button">
                                <input type="button" name="signin" id="signin" class="form-submit" value="Log in"
                                onClick={adminlogin}
                                />
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </section>

    </div>
  )
}

export default Admin