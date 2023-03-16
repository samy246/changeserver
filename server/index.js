const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();


app.use(express.json());

// require("dotenv").config()
 const urlDB=`mysql://root:strongpassword22.@0.0.0.0:3306/examreg`

const db = mysql.createConnection(urlDB
  // {
  //   user: "root",
  //   host: "localhost",
  //   password: "strongpassword22.",
  //   database: "examreg",
  // }
  );

  app.post("/examreg/get",(req,res)=>{
    const sqlGet="SELECT * FROM examregister";
    db.query(sqlGet,(error,result)=>{
        if(error){
            console.log(err);
           return res.send({ err: err });
        }
        if (result.length>0) {
          return  res.status(200).json({
            status: 'succes',
            data: result,
          })
        //     res.statusCode(200);
        // res.send(result);
          } else {
            res.send({ message: "No user found" });
          }

    });
    });

    //admin get
    app.post("/admin/get",(req,res)=>{
      const sqlGet="SELECT * FROM examregister";
      db.query(sqlGet,(error,result)=>{
          if(error){
              console.log(err);
             return res.send({ err: err });
          }
          if (result.length>0) {
            return  res.status(200).json({
              status: 'succes',
              data: result,
            })
          //     res.statusCode(200);
          // res.send(result);
            } else {
              res.send({ message: "No user found" });
            }

      });
      });




  app.post("/examregister", (req, res) => {
    const username = req.body.usernameReg;
    const password = req.body.passwordReg;
    const email=req.body.emailReg;
    const contact=req.body.contactReg;
    const dept=req.body.dept;
const dob=req.body.dob;
const clg=req.body.clg;
const year=req.body.year;
console.log("=username==>",username);
    db.query(
      "INSERT INTO examregister (name,email,password,contact,dept,dob,clg,year) VALUES  (?,?,?,?,?,?,?,?) ",
      [username, email,password,contact,dept,dob,clg,year],
      (err, result) => {
        if (err) {
          console.log(err);
         return res.send({ err: err });
        }
        else{
          return  res.status(200).json({
            status: 'succes',
            data: result,
          })
            // res.sendStatus(200);
            // res.send(result);
            //console.log(result);
        }

      }
    );


  });

//login

  app.post("/examlogin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("loginname",email);
    console.log("loginname",password);
    db.query(
      "SELECT * FROM examregister WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
console.log(result);
console.log("password",password);
console.log("result.email",result.email);
            if (!result.length) {
              return res.status(400).json({
                status: 'error',
                error: 'req body cannot be empty',
              });
            }

          return  res.status(200).json({
              status: 'succes',
              data: result,
            })

      }
    );
  });



//admin login
app.post("/adminlogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("loginname",email);
  console.log("loginname",password);
  db.query(
    "SELECT * FROM examadmin WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
console.log(result);
console.log("password",password);
console.log("result.email",result.email);
          if (!result.length) {
            return res.status(400).json({
              status: 'error',
              error: 'req body cannot be empty',
            });
          }

        return  res.status(200).json({
            status: 'succes',
            data: result,
          })

    }
  );
});














  //update

  app.put("/exammarks", (req, res) => {
    const id = req.body.id;
    console.log("id",id);
    // const password = req.body.passwordReg;
    // const email=req.body.emailReg;
    const marks=req.body.marks;
    console.log("marks",marks);
//console.log("=username==>",username);
    db.query(
      `UPDATE examregister SET marks = ? WHERE id = ${id} `,
      [marks],
      (err, result) => {
        if (err) {
          console.log(err);
         return res.send({ err: err });
        }
        else{
          return  res.status(200).json({
            status: 'succes',
            data: result,
          })

        }

      }
    );


  });







app.listen(5000, () => {
    console.log("Running server 5000");
  });