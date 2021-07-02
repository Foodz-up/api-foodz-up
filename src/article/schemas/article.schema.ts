import * as mongoose from 'mongoose';
import { ETypeArticle } from '../../interfaces';

export const ArticleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ETypeArticle,
  },
  name: String,
  description: String,
  price: Number,
  tag: String,
  picture: String,
  id: Number,
});
