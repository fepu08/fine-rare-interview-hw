import mongoose, { Model, ObjectId } from 'mongoose';
import {
  ProducerDocument,
  ProducerSchema,
} from '../producer/producer-mongoose-schema';

export interface ProductDocument extends Document {
  vintage: string;
  name: string;
  producerId: ObjectId;
  producer: ProducerDocument;
}

interface ProductModel extends Model<ProductDocument> {}
const ProductSchema = new mongoose.Schema({
  vintage: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  producerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  producer: {
    type: ProducerSchema,
    required: true,
  },
});

const Product = mongoose.model<ProductDocument, ProductModel>(
  'Product',
  ProductSchema,
);

export default Product;
