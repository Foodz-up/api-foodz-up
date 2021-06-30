import * as mongoose from 'mongoose';
import { EOrderState } from '../../interfaces';

export const OrderSchema = new mongoose.Schema({
  id: Number,
  price: Number,
  items: [],
  status: String,
  driver: {},
  restaurant: {},
  client: {},
  // TODO: change to date
  date: Number,
});
