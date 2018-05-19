import mongoose from 'mongoose';

const ShapeModel = mongoose.model('Shape', new mongoose.Schema({
  agency_key: {
    type: Number,
    required: true,
    index: true,
  },
  shape_id: {
    type: String,
    required: true,
    index: true,
  },
  shape_pt_lat: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  shape_pt_lon: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  loc: {
    type: [Number],
    index: '2dsphere',
  },
  shape_pt_sequence: {
    type: Number,
    required: true,
  },
  shape_dist_traveled: Number,
}));

export default ShapeModel;
