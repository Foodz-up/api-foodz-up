import * as mongoose from 'mongoose';

export const MenuSchema = new mongoose.Schema({
  name: String,
  description: String,
  articles: [],
  price: Number,
  picture: String,
});
