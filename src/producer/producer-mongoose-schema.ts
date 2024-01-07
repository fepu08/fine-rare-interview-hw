import mongoose, { Model } from 'mongoose';

export interface ProducerDocument extends Document {
  name: string;
  country?: string;
  region?: string;
}

interface ProducerModel extends Model<ProducerDocument> {}
export const ProducerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  region: {
    type: String,
  },
});

const Producer = mongoose.model<ProducerDocument, ProducerModel>(
  'Producer',
  ProducerSchema,
);

export default Producer;
