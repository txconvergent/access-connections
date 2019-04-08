const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const credentials = require('./credentials')
const models = require('./data')
const app = express()

const Data = models.Data
const Listing = models.Listing

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

app.get("/get_listing", (req, res) => {
  Listing.find((err, data) => {
    if (err) return res.json({success: false, error: err})
    return res.json({success: true, data: data})
  })
})

app.post("/write_user", (req, res) => {
  let data = new Data()
  const {user, pass} = req.body
  if (!user || !pass) return res.json({success: false, error:"Invalid input."})

  data.user = user
  data.pass = pass
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

app.post("/write_listing", (req, res) => {
  let listing = new Listing()
  const {user, title, number} = req.body
  if (!user || !title || !number) return res.json({success: false, error:"Invalid input."})
  console.log(req.body)
  listing.user = user
  listing.title = title
  listing.listingNumber = number
  listing.deleted = false
  listing.save (err => {
    if (err) return res.json({success: false, error: err})
    return res.json({success: true})
  })
})

app.listen(port, () => console.log(`Listening on port ${port}.`))