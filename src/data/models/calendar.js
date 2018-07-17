import mongoose from 'mongoose';

const CalendarModel = mongoose.model('Calendar', new mongoose.Schema({
  agency_key: {
    type: Number,
    required: true,
    index: true,
  },
  service_id: {
    type: String,
    required: true,
  },
  monday: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  tuesday: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  wednesday: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  thursday: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  friday: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  saturday: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  sunday: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  start_date: {
    type: Number,
    required: true,
    min: 10000000,
  },
  end_date: {
    type: Number,
    required: true,
    min: 10000000,
  },
  created: {
    type: Date,
    default: Date.now,
  },
}));

export default CalendarModel;
