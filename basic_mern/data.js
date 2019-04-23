const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
  {
    message: String,
    user: String,
    pass: String
  },
  {timestamps: true}
)
const ListingSchema = new Schema(
  {
    user: String,
    title: String,
    listingNumber: Number,
    deleted: Boolean,
    description: String,
    location: String,
    image: Buffer,
    imageContentType: String,
    date: String
  },
  {timestamps: true}
)

module.exports = {
  Data: mongoose.model("Data", DataSchema),
  Listing: mongoose.model("Listing", ListingSchema)
};