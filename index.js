const express = require("express")
console.log(process.env["PASSWORDID"])
if (process.env["PASSWORDID"] == undefined) {
    require('dotenv').config({path:".env"})
    require('dotenv').config({path:".env.development.local"})
} 
const app = express()
const password = process.env["PASSWORDID"]
var cookies = require("cookie-parser")
const { kv } = require("@vercel/kv")
const { json } = require("body-parser")

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
    latestdata = kv.get("latestdata")
    res.send(latestdata)
})

app.get("/api/contribute", (req,res) => {
    latestdata = kv.get("latestdata")
    console.log("Downloaded latest data")
    bigjson = JSON.parse(latestdata)
    console.log("Parsing complete")
    const fach = req.query["fach"]
    const notiz = req.query["aufgabe"]
    var id = Math.floor(100000 + Math.random() * 900000)
    bigjson[id] = {"aufgabe": notiz, "fach": fach}
    console.log("Erstellung des neuen Tables erfolgreich")
    latestdata = JSON.stringify(bigjson)
    console.log("ToString erfolgreich")
    kv.set("latestdata")
    console.log("Works")
    res.send(latestdata)
})

app.get("/src/js", (req,res) => {
    res.sendFile(__dirname + "/dashboardfunctions.js")
})

app.listen(3000, () => {
    console.log("ONLINE")
})

module.exports = app