const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const credentials = require('./credentials')
const models = require('./data')
const app = express()
const fs = require('fs')

const Data = models.Data
const Listing = models.Listing
const imgPath = '/Users/neil/Pictures/download.jpeg'

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
    data = data.filter(dat => !dat.deleted)
    if (err) return res.json({success: false, error: err})
    return res.json({success: true, data: data})
  })
})

app.get("/find_listing/:id", (req, res) => {
  const id = req.params.id
  Listing.findById(id, (err, data) => {
    if (err) return res.send(err)
    res.send(data)
  })
})

app.get("/find_image/:id", (req, res) => {
  const id = req.params.id
  Listing.findById(id, (err, data) => {
    if (err) {
      return res.send(err)
    }
    if (data.image) {
      res.send(data.image)
    }
    else {
      default_id = "5cb64e9afd36341fe726f3b3"
      Listing.findById(default_id, (error, dat)=> {
        if (error) return res.send(err)
        return res.send(dat.image)
      })
    }
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
  const {user, title, number, description, image} = req.body
  if (!user || !title) return res.json({success: false, error:"Invalid input."})
  listing.user = user
  listing.title = title
  listing.listingNumber = number
  listing.description = description
  listing.deleted = false
  console.log(image)
  if (image) {
    listing.image = fs.readFileSync(image)
    listing.imageContentType = "image/jpg";
  }
  else {
    listing.image = app.get("/find_image/5cb64e9afd36341fe726f3b3"), (req, res) 
  }
  listing.save (err => {
    if (err) return res.json({success: false, error: err})
    return res.json({success: true})
  })
})

app.get("/delete_listing/:id", (req, res) => {
  const id = req.params.id
  Listing.findByIdAndUpdate(id, {deleted: true}, (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}.`))