const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  idUser:{
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventInformations: {
    type: String,
  },
  coords: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  distance: {
    type: String,
    required: true,
  },
  iframe: {
    type: String,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  startHour: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  commentaires: [
    {
      type: String,
    },
  ],
  addedDate: {
    type: String,
    required: true,
  },
  needValidate: {
    type: Boolean,
    required: true,

    default: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
