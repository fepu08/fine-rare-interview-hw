import { ProducerDTO } from '../producer/producer-dto';

export type ProductDTO = {
  _id?: string;
  vintage: string;
  name: string;
  producerId: string;
  producer?: ProducerDTO;
};

export type ProductIntermediate = {
  vintage: string;
  name: string;
  producer: ProducerDTO;
};

export type DeleteProductRequestBody = { productIds: string[] };
