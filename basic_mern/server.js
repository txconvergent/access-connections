const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const credentials = require('./credentials')
const Data = require('./data')

const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(credentials.dbRoute, {useNewUrlParser: true})
let db = mongoose.connection

db.once("open", () => console.log("Connected to the database."))
db.on("error", console.error.bind(console, "MongoDB connection error:"))

const port = 5000

app.post("/write_data", (req, res) => {
  let data = new Data()
  const {message} = req.body

  if (!message) return res.json({success: false, error: "Invalid input."})

  data.message = message
  data.save(err => {
    if (err) return res.json({success: false, error: err})
    return res.json({success: true})
  })
})

app.get("/get_data", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({success: false, error: err})
    return res.json({success: true, data: data})
  })
})

app.post("/write_user", (req, res) => {
  console.log("awlehgfiowehfoiwe")
  let data = new Data()
  const {acct} = req.body
  console.log(req.body)
  if (!acct) return res.json({success: false, error:"Invalid input."})

  data.user = acct.user
  data.pass = acct.pass
  data.save(err => {
    if (err) return res.json({success: false, error: err})
    return res.json({success: true})
  })
})

app.delete("/delete_data", (req, res) => {
  const {id} = req.body
  Data.findByIdAndDelete(id, (err) => {
    if (err) return res.send(err)
    return res.json({success: true})
  })
})

app.listen(port, () => console.log(`Listening on port ${port}.`))