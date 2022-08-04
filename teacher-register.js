const express = require('express');
const RegisterForm = express();
const mysql = require("mysql");
const cors = require('cors');
const { application } = require('express');

RegisterForm.use(cors());
RegisterForm.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "attendanceSystem",
});

RegisterForm.post("/new", (req, res) => {
    const name = req.body.name
    const register = req.body.register
    const section = req.body.section
    //const subject = req.body.subject
    const password = req.body.password

    db.query("INSERT INTO teacher (name, register, section, password) VALUES (?,?,?,?)",
     [name, register, section, password], (err, result) => {
         if(err) {
             console.log(err)
         } else {
             res.send("Values Inserted")
         }
     }
     );
    });

RegisterForm.listen(3005, () => {
    console.log("Your server is running on port 3005")
});