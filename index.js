const express = require("express")
console.log(process.env["PASSWORDID"])
if (process.env["PASSWORDID"] == undefined) {
    require('dotenv').config()
} 
const app = express()
const password = process.env["PASSWORDID"]
var cookies = require("cookie-parser")

app.use(cookies())

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
        res.cookie("LoggedIn", password)
        res.sendFile(__dirname + "/afterlogin.html")
    }
})

app.get("/therealantidodo", (req, res) => {
    const cookie = req.cookies["LoggedIn"]
    if (cookie == password) {
        res.sendFile(__dirname + "/dashboard.html")
    } else {
        res.status(401).send("<error><h1>401: Unauthorized</h1></error>")
    }
})

app.get("/api/data", (req,res) => {
    res.send("{'foo':'bar'}")
})

app.listen(3000, () => {
    console.log("ONLINE")
})

module.exports = app