const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListingSchema = new Schema(
    {
      user: String,
      title: String,
      listingNumber: Number
    }, {timestamps: true}
  )


module.exports = mongoose.model("Listing", ListingSchema)