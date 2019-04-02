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
    deleted: Boolean
  },
  {timestamps: true}
)

module.exports = {
  Data: mongoose.model("Data", DataSchema),
  Listing: mongoose.model("Listing", ListingSchema)
};