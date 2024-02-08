const express = require("express")
require('dotenv').config()
const app = express()
const password = process.env["PASSWORDID"]

console.log(password)

console.log("I am running")

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/early-access-login", (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

app.get("/api/loginapi", (req,res) => {
    const pass = req.query.loginnumber
    if (pass == password) {
        res.sendFile(__dirname + "/afterlogin.html")
    }
})

app.listen(3000, () => {
    console.log("ONLINE")
})

module.exports = app