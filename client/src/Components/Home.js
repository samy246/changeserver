import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import MyTimer from "./Timer";
import Sectiontwo from "./Sectiontwo";
//import Question from "./Question";
// import quiz from './quiz';
// import Quiz from 'react-quiz-component';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
const questions = [
  {
    id: 1,
    question: "All keywords in C are in ",
    options: ["CamelCaseletters", "LowerCaseletters", "UpperCaseletters"],
    answer: "LowerCaseletters",
  },
  {
    id: 2,
    question: "What is #include <stdio.h>?",
    options: [
      "Preprocessordirective",
      "Inclusiondirective",
      " Recursive macros",
    ],
    answer: "Preprocessordirective",
  },
  {
    id: 3,
    question: "How many keywords are there in C language?",
    options: ["32", "33", "64"],
    answer: "32",
  },
  {
    id: 4,
    question: "The C source file is processed by the ___.",
    options: ["Interpreter", "Compiler", "Both Interpreter and Compiler"],
    answer: "Compiler",
  },
  {
    id: 5,
    question: "How many punctuation characters are allowed in C language?",
    options: ["29", "30", "32"],
    answer: "29",
  },

  {
    id: 6,
    question: "What is the 16-bit compiler allowable range for integer constants?",
    options: ["-32668 to 32667", "-32767 to 32768", "-32768 to 32767"],
    answer: "-32768 to 32767",
  },
  {
    id: 7,
    question: "What is a lint?",
    options: ["C compiler", "Interactive debugger", "Analyzing tool"],
    answer: "Analyzing tool",
  },

  {
    id: 8,
    question: "Why is a macro used in place of a function?",
    options: ["It reduces execution time.", "It increases code size.", "It reduces code size."],
    answer: "It reduces code size.",
  },

  {
    id: 9,
    question: "Which one of the following is a loop construct that will always be executed once?",
    options: ["while", "switch", "do while"],
    answer: "do while",
  },

  {
    id: 10,
    question: "Directives are translated by the",
    options: ["Compiler", "Linker", "Pre-processor"],
    answer: "Pre-processor",
  },
  {
    id: 11,
    question: "Each instance of a class has a different set of",
    options: ["Class interfaces", "Methods", "Attribute values"],
    answer: "Attribute values",
  },
  {
    id: 12,
    question: "What is the maximum number of characters that can be held in the string variable char address line [40]?",
    options: ["38", "40", "39"],
    answer: "39",
  },

  {
    id: 13,
    question: "Which of the following SLT template class is a container adaptor class?",
    options: ["List", "Deque", "Stack"],
    answer: "Stack",
  },

  {
    id: 14,
    question: "Let p1 be an integer pointer with a current value of 2000. What is the content of p1 after the expression p1++ has been evaluated?",
    options: ["2001", "2002", "2004"],
    answer: "2004",
  },

  {
    id: 15,
    question: "If addition had higher precedence than multiplication, then the value of the expression (1 + 2 * 3 + 4 * 5) would be which of the following?",
    options: ["27", "47", "105"],
    answer: "105",
  },

  {
    id: 16,
    question: "Array is a _________ data structure.",
    options: ["Non-linear", "Primary", "linear"],
    answer: "linear",
  },

  {
    id: 17,
    question: "Which of the following function is used to write the integer in a file?",
    options: ["getw()", "int value", "putw()"],
    answer: "putw()",
  },

  {
    id: 18,
    question: "What type of data type does the atoi() function return?",
    options: ["String", "char", "Integer"],
    answer: "Integer",
  },

  {
    id: 19,
    question: "Which of the following keywords is used to prevent any kind of change in a variable?",
    options: ["continue", "struct", "const"],
    answer: "const",
  },

  {
    id: 20,
    question: "The enum keyword is used to assign names to the ________ constants.",
    options: ["String", "Character", "Integer"],
    answer: "const",
  },


];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
export default function Home() {
  //

  const [one, setone] = useState(true);
  const [two, settwo] = useState(false);

  const [count, setCount] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10); // 10 minutes timer
  const [showNavText, setShowNavText] = useState(false);
  const navigate = useNavigate();

  var loginname;

  loginname = localStorage.getItem("login");

  useEffect(() => {
    const unansweredQuestions = questions.filter(
      (q) => !answeredQuestions.includes(q.id)
    );
    if (unansweredQuestions.length === 0) {
      // Display final score
      localStorage.setItem("sectionone", score);
      alert(`You scored ${score} out of ${questions.length} in Section-1`);
      if (score > 14) {
        alert("You Passed First Section and Move into Second Section");
        setone(false);
        settwo(true);
      }
      if (score < 15) {
        alert("You Failed First Section.Please Again Login to Continue");
        navigate("/");
        localStorage.removeItem("sectionone");
        localStorage.removeItem("login");
      }
    } else {
      // Shuffle unanswered questions and set the current question index to the first unanswered question
      const shuffledQuestions = shuffleArray(unansweredQuestions);
      setCurrentQuestionIndex(shuffledQuestions[0].id - 1);
    }
  }, [answeredQuestions]);

  const handleAnswer = (answer) => {
    console.log("anser doc",document.getElementById(answer).innerHTML);
    if(document.getElementById(answer).innerHTML == answer){
      document.getElementById(answer).style.backgroundColor="#17c665"
      document.getElementById(answer).style.backgroundSize="auto"
    }

    setTimeout(()=>{
      setCount(count + 1);
      const currentQuestion = questions[currentQuestionIndex];
      if (answer === currentQuestion.answer) {
        setScore(score + 1);
      }
      setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);

    },3000)

  };

  const currentQuestion = questions[currentQuestionIndex];

  console.log("currentQuestion", currentQuestionIndex);

  const logout = () => {
    localStorage.removeItem("login");
    // localStorage.removeItem("name");
    // localStorage.removeItem("questions");
    // localStorage.removeItem("score");
    // localStorage.removeItem("setscore");
    // localStorage.removeItem("setquestiosn");
    navigate("/");
  };
  // quiz/***************************************************************************************************** */

  return (
    <div>
      {/* <Quiz quiz={quiz} shuffle={true}/> */}
      {/* <h1>Home</h1> */}
      <header class="header">
        {/* <!-- Logo --> */}
        <a href="#" class="logo">
          {" "}
          <MyTimer expiryTimestamp={time} />
        </a>

        {/* <!-- Hamburger icon --> */}
        <input class="side-menu" type="checkbox" id="side-menu" />
        <label class="hamb" for="side-menu">
          {/* <span class="hamb-line"></span> */}☰
        </label>

        {/* <!-- Menu --> */}
        <nav class="nav">
          <ul class="menu">
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Blog</a>{" "}
            </li>
            <li>
              <a href="#" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <h1>Welcome {loginname}</h1>

      {one && (
        <div className="sectionone">
          <h1>Section-1</h1>
          <h2 className="question">
            {count}.{currentQuestion.question}
          </h2>
          {currentQuestion.options.map((option) => (
            <li
              key={option}
              id={option}
              value={option}
              onClick={() => handleAnswer(option)}
              style={{ cursor: "pointer" }}
            >
              {option}
            </li>

            // <button key={option} onClick={() => handleAnswer(option)}>{option}</button>
          ))}
        </div>
      )}

      {/* <div className="sectionone">
  <h1>Section-1</h1>
      <h2>{count}.{ currentQuestion.question}</h2>
      {currentQuestion.options.map(option => (


  <li key={option} onClick={() => handleAnswer(option)} style={{cursor:"pointer"}}>{option}</li>


        // <button key={option} onClick={() => handleAnswer(option)}>{option}</button>
      ))}
    </div> */}

      <div style={{ display: two ? "block" : "none" }}>
        <Sectiontwo />
      </div>

      {/* <div className="sectiontwo" opentwo={opentwo}> */}
      {/* {
        setopentwo ? <Sectiontwo/> :null
      } */}

      {/*
      <h2>{count}.{ currentQuestion.question}</h2>
      {currentQuestion.options.map(option => (


  <li key={option} onClick={() => handleAnswer(option)} style={{cursor:"pointer"}}>{option}</li>



      ))} */}
      {/* </div> */}
    </div>
  );
}
