import React,{useState,useEffect} from 'react';
import "./Sectionthree.css"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal"
import jq1 from '../images/jq1.jpg'
import jq2 from '../images/jq2.jpg'
import jq3 from '../images/jq3.jpg'
import jq4 from '../images/jq4.jpg'
import jq5 from '../images/jq5.jpg'
import jq6 from '../images/jq6.jpg'
import jq7 from '../images/jq7.jpg'
import jq8 from '../images/jq8.jpg'
import jq9 from '../images/jq9.jpg'
import jq10 from '../images/jq10.jpg'
import axios from 'axios';
const Sectionthree=()=>{
    const [questions, setQuestions] = useState([
        {
          id: 1,
          question: jq1,
          answer: 'sum=n1+n2',//add two number
          userAnswer: '',
        },
        {
          id: 2,
          question: jq2,
          answer: 'sum=n1%n2',
          userAnswer: '',
        },
        {
          id: 3,
          question: jq3,
          answer: 'Integer.parseInt(s)',//string to integer
          userAnswer: '',
        },
        {
            id: 4,
            question: jq4,
            answer: 'Math.random()',
            userAnswer: '',
        },
        {
            id: 5,
            question: jq5,
            answer: 'numbers.length',//print number of eleemnet
            userAnswer: '',
        },{
          id: 6,
          question: jq6,
          answer: '-127',
          userAnswer: '',
        },{
          id: 7,
          question: jq7,
          answer: 'str2.reverse()',
          userAnswer: '',
        },{
          id: 8,
          question: jq8,
          answer: 'str.toCharArray()',
          userAnswer: '',
        },{
          id: 9,
          question: jq9,
          answer: 'str1.charAt(2)',
          userAnswer: '',
        },{
          id: 10,
          question: jq10,
          answer: 'trim()',
          userAnswer: '',
        }
      ]);

      const [sone,setsone]=useState('')
      const [stwo,setstwo]=useState('')
      const [sthree,setsthree]=useState('');
      const [total,settotal]=useState('')
      const [open, setOpen] = useState(false);
      const [score, setScore] = useState(0);
      const [shuffledQuestions, setShuffledQuestions] = useState([]);
  //    const[three,setthree]=useState(false);
const navigate=useNavigate()
      useEffect(() => {
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
      }, [questions]);

      const handleChange = (e, id) => {

        const newQuestions = [...shuffledQuestions];
        const index = newQuestions.findIndex((q) => q.id === id);
        newQuestions[index].userAnswer = e.target.value;
        setShuffledQuestions(newQuestions);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target.value != " "){
        const newScore = shuffledQuestions.reduce((acc, q) => {
          if (q.answer.toLowerCase() === q.userAnswer.toLowerCase()) {
            return acc + 2;
          }
          return acc;
        }, 0);
        setScore(newScore);
        alert(`You scored ${newScore} out of 20 in Section-3`)
      localStorage.setItem("sectionthree",newScore)
      var sonemark=localStorage.getItem("sectionone");
      setsone(sonemark)
      var stwomark=localStorage.getItem("sectiontwo");
      setstwo(stwomark)
      var sthreemark=localStorage.getItem("sectionthree");
      setsthree(sthreemark)

      var totalmarks=Number( sonemark)+Number( stwomark)+Number(sthreemark);
      console.log("totalmarks",totalmarks);
settotal(totalmarks)
var logindetails=JSON.parse(localStorage.getItem("logindetails"))
console.log("logindetails",logindetails);
console.log("logindetails.id",logindetails.id);
setOpen(true)

axios.put("http://localhost:5000/exammarks",{
  id:logindetails.id,
  marks:totalmarks,
}).then((resp)=>{
  if(resp.data.mesaage){
    toast.error("marks save failed :| "+resp.data.message)
    console.log('if ');
  }
  else{
    console.log('else');
    console.log("resposne",resp);
   // console.log("response.data[0]",response.data.data[0].email);
   // setloginstatus(response.data[0].staffname)
    toast.success("Successfully Marks Saved :) " )

  }
})
      console.log("all marks",sonemark,stwomark,sthreemark);


      }
      else{
        alert("Please Fill All  Answer")
      }
      };
      const onCloseModal = () => {
setOpen(false)
localStorage.removeItem("logindetails");
localStorage.removeItem("sectionone");
localStorage.removeItem("sectiontwo");
localStorage.removeItem("sectionthree");
//localStorage.removeItem("");
navigate('/')
      }
 //   console.log("q",questions);
    return(
  //       <div>
  //  <img src={questions[0].question} alt=''/>
  //       </div>
<>


<div>
<h1>Section-3</h1>
{shuffledQuestions.map((q,i) => (
  //console.log("q",q,i)
<div key={q.id}>
  <h3>{i+1}.</h3>
<h4><img src={q.question} alt=''/></h4>
Answer:<input type="text" value={q.userAnswer} onChange={(e) => handleChange(e, q.id)} id='getvalue'/>
</div>
))}
<button onClick={handleSubmit} style={{display:"inline-block",backgroundColor:"#7b38d8",padding:"20px",width:"200px",color:"#ffffff",textAlign:"center"}}>Submit</button>
{/* {score > 0 && (
<div>
<h4>Your score: {score}</h4>
</div>
)} */}
</div>

<Modal open={open} onClose={onCloseModal} center
onOverlayClick={false}
>
<h2 style={{fontSize:"23px",textAlign:"center",opacity:"0.85",padding:"5px"}}>Congratulations🎉🎉🎉</h2>
<hr></hr>
<h3 style={{textDecoration:"underline",fontFamily:"italic"}}>You Successfully Completed Your Exam </h3>
<table style={{border:"1px solid black",textAlign:"center"}} id="scoremodal">
  <tr>
    <th>Sections</th>
    <th>Total Marks</th>
    <th>Your Score</th>
  </tr>

  <tr>

    <td>Section-1</td>
    <td>5</td>
    <td>{sone}</td>
    </tr>

  <tr>
  <td>Section-2</td>
    <td>5</td>
    <td>{stwo}</td>

  </tr>

  <tr>
  <td>Section-3</td>
    <td>5</td>
    <td>{sthree}</td>

  </tr>
  <tr>
    <td>Total Marks</td>
    <td>{total}</td>
  </tr>
</table>
<hr></hr>
<h2 style={{fontSize:"13px",textAlign:"center",opacity:"0.85"}}>*****THANK YOU*****</h2>
</Modal>
</>

    )
}

export default Sectionthree