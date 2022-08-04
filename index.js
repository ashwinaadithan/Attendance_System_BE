const express = require('express');
const tableApp = express();
const mysql = require("mysql");
const cors = require('cors');
const { application } = require('express');

tableApp.use(cors());
tableApp.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "attendanceSystem",
});

tableApp.post("/create", (req, res) => {
    const name = req.body.name
    const register = req.body.register
    const dob = req.body.dob

    db.query("INSERT INTO student (name, register, dob) VALUES (?,?,?)",
     [name, register, dob], (err, _result) => {
         if(err) {
             console.log(err)
         } else {
             res.send("Values Inserted")
         }
     }
     );
    });

     tableApp.get('/student', (req, res) => {
       db.query("SELECT * FROM student", (err, result) => {
         if (err) {
           console.log(err)
         } else {
           res.send(result)
         }
         })
       })

      tableApp.put('/update', (req, res) => {
        const id = req.body.id
        const register = req.body.register;
        db.query("UPDATE student SET register = ? WHERE id = ?", [register, id], (err, result) =>{
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
          }
      )
        });

      tableApp.delete('/delete/:id', (req, res) => {
        const id = req.params.id
        db.query("DELETE FROM student WHERE id = ?", id, (err, result) => {
          if (err){
            console.log(err)
          } else {
            res.send(result);
          }
        })
      })

tableApp.listen(3005, () => {
    console.log("Your server is running on port 3005")
});