import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from "axios"
import "./style.css"
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal"

const Loginform=()=> {
const navigate=useNavigate()
const [open, setOpen] = useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const [questions, setQuestions] = useState();
    const [name, setName] = useState();
    const [score, setScore] = useState(0);
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


const login=()=>{
    if(validate()){
        axios.post("http://localhost:5000/examlogin",{
      email:email,
      password:password,
    }).then((response)=>{
      if(response.data.message){
      //setloginstatus(response.data.message);
toast.error("Login failed :| "+response.data.message)
console.log('if ');
      }else{
        console.log('else');
        console.log("resposne",response);
        console.log("response.data[0]",response.data.data[0].email);
       // setloginstatus(response.data[0].staffname)
        toast.success("Successfully Login :) " +response.data.data[0].email)
        setOpen(true);
localStorage.setItem("logindetails",JSON.stringify( response.data.data[0]))
        // setstaffpassword
        localStorage.setItem("login",response.data.data[0].email)
      }
    })
    //validate
    }
    const data = {
      topic: 'Javascript',
      level: 'Beginner',
      totalQuestions: 10,
      perQuestionScore: 5,
      totalTime: 60, // in seconds
      results: [
        {
          question:
            'Which function is used to serialize an object into a JSON string in Javascript?',
            incorrect_answers: [ 'parse()', 'convert()', 'None of the above'],
          type: 'MCQs',
          correct_answer: 'stringify()',
        },
        {
          question:
            'Which of the following keywords is used to define a variable in Javascript?',
            incorrect_answers: ['var', 'let', 'None of the above'],
          type: 'MCQs',
          correct_answer: 'var and let',
        },
        {
          question:'Which of the following methods can be used to display data in some form using Javascript?',
            incorrect_answers: [
            'document.write()',
            'console.log()',
            'window.alert',

          ],
          type: 'MCQs',
          correct_answer: 'All of the above',
        },
        {
          question: 'How can a datatype be declared to be a constant type?',
          incorrect_answers: [ 'var', 'let', 'constant'],
          type: 'MCQs',
          correct_answer: 'const',
        },
      ],
    }

 setQuestions(data.results)
}


const onCloseModal = () => {

    setOpen(false);
    // localStorage.setItem("name",name);
    // localStorage.setItem("questions",JSON.stringify(questions));
    // localStorage.setItem("score",score);
    // localStorage.setItem("setscore",setScore);
    // localStorage.setItem("setquestiosn",setQuestions);
    navigate('/home',)
}

  return (
    <div className='main'>
        <h1 style={{textAlign:"center"}}>Exam Login</h1>
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
                        <h2 class="form-title">Sign In</h2>
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
                            <div class="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div class="form-group form-button">
                                <input type="button" name="signin" id="signin" class="form-submit" value="Log in"
                                onClick={login}
                                />
                            </div>
                        </form>
                        {/* <div class="social-login">
                            <span class="social-label">Or login with</span>
                            <ul class="socials">
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} center
            onOverlayClick={false}
            >
        <h2 style={{fontSize:"23px",textAlign:"center",opacity:"0.85"}}>***Instructions***</h2>
        <hr></hr>
        <h3 style={{textDecoration:"underline",fontFamily:"italic"}}>Please Read Instruction Carefully </h3>
       <ul>

         <li>* Please Attend 3 Sections</li>
         <li>* They are 60 questions.</li>
         <li>* Each Question have 1 Marks</li>
         <li>* Each Section Pass Marks will be 3</li>
         <li>* If You below Pass mark automatically Logout,you attend re-exam</li>
        <li>* Each Section have 5 Marks</li>
        <li>* Be carefully Time Will be Only 60 Minutes for all 3 Sections</li>
        <li>* Section-1 has C-language Mcq Question</li>
        <li>* Section-2 has C++ -language Questions</li>
        <li>* Section-3 has JAVA -language Logic Questions</li>
        <li>*** When You close this automatically Start Timing</li>
          </ul>
          <hr></hr>
          <h2 style={{fontSize:"13px",textAlign:"center",opacity:"0.85"}}>*****All the Best 👍👍👍*****</h2>
      </Modal>
        </section>

    </div>
  )
}
export default Loginform