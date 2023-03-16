import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import './Sectiontwo.css'
import Sectionthree from './Sectionthree'
export default function Sectiontwo() {
    const [questions, setQuestions] = useState([
        {
          id: 1,
          question: 'If we stored five elements or data items in an array, what will be the index address or the index number of the array last data item?',
          answer: '4',
          userAnswer: '',
        },
        {
          id: 2,
          question: 'What type of integer starts with 0X',
          answer: 'hexadecimal',
          userAnswer: '',
        },
        {
          id: 3,
          question: '_____refers to the wrapping of data and its functionality into a single individual entity?',
          answer: 'encapsulation',
          userAnswer: '',
        },
        {
            id: 4,
            question: 'Every C++ program begins execution at the function',
            answer: 'main',
            userAnswer: '',
        },
        {
            id: 5,
            question: '____ is the smallest individual unit in a program',
            answer: 'token',
            userAnswer: '',
        },
        {
          id: 6,
          question: 'How many can max number of arguments present in function in the c99 compiler?',
          answer: '127',
          userAnswer: '',
        },
        {
          id: 7,
          question: 'How many minimum number of functions should be present in a C++ program for its execution?',
          answer: '1',
          userAnswer: '',
        },
        {
          id: 8,
          question: 'Which of the following is the default return value of functions in C++?',
          answer: 'int',
          userAnswer: '',
        },
        {
          id: 9,
          question: 'An inline function is expanded during ______________',
          answer: 'compile',
          userAnswer: '',
        },
        {
          id: 10,
          question: 'Which of the following feature is used in function overloading and function with default argument?',
          answer: 'Polymorphism',
          userAnswer: '',
        },
        {

            id: 11,
            question: 'The constants are also called as',
            answer: 'literals',
            userAnswer: '',

        },
        {

          id: 12,
          question: 'Which data type is used to represent the absence of parameters?',
          answer: 'void',
          userAnswer: '',

      },
      {

        id: 13,
        question: 'The value 132.54 can be represented using which data type?',
        answer: 'double',
        userAnswer: '',

    },{
      id: 14,
        question: 'When a language has the capability to produce new data type mean, it can be called as',
        answer: 'extensible',
        userAnswer: '',
    },
    {
      id: 15,
        question: 'How many characters are specified in the ASCII scheme?',
        answer: '128',
        userAnswer: '',
    },{
      id: 16,
      question: 'What is a constant that contains a single character enclosed within single quotes?',
      answer: 'Character',
      userAnswer: '',
    },{
      id: 17,
      question: 'What is the size of a boolean variable in C++?____bit',
      answer: '1',
      userAnswer: '',
    },{
      id: 18,
      question: 'Which of the following is C++ equivalent for scanf()?',
      answer: 'cin',
      userAnswer: '',
    },{
      id: 19,
      question: 'Which of the following is C++ equivalent for printf()?',
      answer: 'cout',
      userAnswer: '',
    },{
      id: 20,
      question: ' _________ is an abstract data type.',
      answer: 'class',
      userAnswer: '',
    }
      ]);
const navigate=useNavigate()
     const [score, setScore] = useState(0);
      const [shuffledQuestions, setShuffledQuestions] = useState([]);
      const[two,settwo]=useState(true);
    const[three,setthree]=useState(false);

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
const validate=()=>{

}
      const handleSubmit = (e) => {
        e.preventDefault();
if(e.target.value != " "){
console.log("userans",e.target.value=="");
        const newScore = shuffledQuestions.reduce((acc, q) => {


          if (q.answer.toLowerCase() === q.userAnswer.toLowerCase()) {
            return acc + 1;
          }

          return acc;
        }, 0);

        setScore(newScore);
        alert(`You scored ${newScore} out of 20 in Section-2`)
        if(newScore > 14 ){
          alert("You Passed Second Section and Move into Third Section");
          localStorage.setItem("sectiontwo",newScore)
           //setone(false);
           settwo(false);
           setthree(true)

      }
      if(newScore < 15){
        alert("You Failed Second Section.Please Again Login to Continue")
        navigate('/')
        localStorage.removeItem("sectionone");
        localStorage.removeItem("Sectiontwo")
        localStorage.removeItem("login");
      }

    }


      else{
        alert("Please Fill All  Answer")
      }


      };
  return (
    <>
    {two && (
 <div className='sectiontwo'>
 <h1>Section-2</h1>
<h2 style={{padding:"7px"}}>Note:***Please Type Answers without Space****</h2>

{shuffledQuestions.map((q,i) => (
   //console.log("q",q,i)
<div key={q.id}>
 <h4>{i+1}.{q.question}</h4>
 Answer:  <input type="text" value={q.userAnswer} onChange={(e) => handleChange(e, q.id)} id='getvalue'/>
</div>
))}
<button onClick={handleSubmit} style={{display:"inline-block",backgroundColor:"#7b38d8",padding:"20px",width:"200px",color:"#ffffff",textAlign:"center"}}>Submit</button>
{/* {score > 0 && (
<div>
 <h4>Your score: {score}</h4>
</div>
)} */}
</div>
    )}


    <div style={{display: (three) ? 'block' : 'none'}}><Sectionthree/></div>

    </>
  )
}
