import mongoose from 'mongoose';

const AgencyModel = mongoose.model('Agency', new mongoose.Schema({
  agency_id: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  agency_name: String,
  agency_url: String,
  agency_timezone: String,
  agency_lang: String,
  agency_phone: String,
  agency_email: String,
  created: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
}));

export default AgencyModel;
