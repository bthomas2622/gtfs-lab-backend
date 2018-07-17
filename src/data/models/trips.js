import mongoose from 'mongoose';

const TripModel = mongoose.model('Trip', new mongoose.Schema({
  agency_key: {
    type: Number,
    required: true,
    index: true,
  },
  route_id: {
    type: String,
    required: true,
    index: true,
  },
  service_id: {
    type: String,
    required: true,
    index: true,
  },
  trip_id: {
    type: String,
    required: true,
    index: true,
  },
  trip_headsign: String,
  trip_short_name: String,
  direction_id: {
    type: Number,
    index: true,
    min: 0,
    max: 1,
  },
  block_id: String,
  shape_id: String,
  wheelchair_accessible: {
    type: Number,
    min: 0,
    max: 2,
  },
  bikes_allowed: {
    type: Number,
    min: 0,
    max: 2,
  },
  created: {
    type: Date,
    default: Date.now,
  },
}));

export default TripModel;
