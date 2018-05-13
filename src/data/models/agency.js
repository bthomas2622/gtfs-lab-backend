import { Schema, Model } from 'mongoose';

const Agency = Model('Agency', new Schema({
  agency_id: {
    type: String,
    required: true,
    index: true,
  },
  agency_name: String,
  agency_url: String,
  agency_timezone: String,
  agency_lang: String,
  agency_phone: String,
  agency_email: String,
  created: Date,
  last_updated: Date,
}));

export default Agency;
