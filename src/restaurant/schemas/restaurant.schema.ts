import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema({
  name: String,
  type: String,
  menus: [],
  articles: [],
  timetable: {
    lundi: { mStart: String, mEnd: String, aStart: String, aEnd: String },
    mardi: { mStart: String, mEnd: String, aStart: String, aEnd: String },
    mercredi: { mStart: String, mEnd: String, aStart: String, aEnd: String },
    jeudi: { mStart: String, mEnd: String, aStart: String, aEnd: String },
    vendredi: { mStart: String, mEnd: String, aStart: String, aEnd: String },
    samedi: { mStart: String, mEnd: String, aStart: String, aEnd: String },
    dimanche: { mStart: String, mEnd: String, aStart: String, aEnd: String },
  },
  picture: String,
  address: String,
  editor: Number,
  waiting: Number,
  note: Number,
});
