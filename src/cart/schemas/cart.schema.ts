import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
  id: Number,
  articles: [],
  price: Number,
});
