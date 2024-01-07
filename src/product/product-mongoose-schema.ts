import mongoose, { Model, ObjectId } from 'mongoose';

export interface ProductDocument extends Document {
  vintage: string;
  name: string;
  producerId: ObjectId;
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
    ref: 'Producer',
    required: true,
  },
});

ProductSchema.virtual('producer', {
  ref: 'Producer',
  localField: 'producerId',
  foreignField: '_id',
  justOne: true,
});

ProductSchema.set('toJSON', {
  virtuals: true,
  transform: function (_doc, ret) {
    delete ret.id;
  },
});
ProductSchema.set('toObject', {
  virtuals: true,
  transform: function (_doc, ret) {
    delete ret.id;
  },
});

const Product = mongoose.model<ProductDocument, ProductModel>(
  'Product',
  ProductSchema,
);

export default Product;
