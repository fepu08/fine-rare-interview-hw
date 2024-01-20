import ResourceAlreadyExistsError from '../errors/resource-already-exists-error';
import { ProducerDTO } from './producer-dto';
import Producer from './producer-mongoose-schema';

export class ProducerDAO {
  public static async createProducer(producer: ProducerDTO) {
    const { _id, ...rest } = producer;
    const producerExists = await Producer.findOne(rest);
    if (producerExists) {
      return producerExists;
    }

    return await Producer.create(rest);
  }

  public static async getProducerById(id: string) {
    return await Producer.findById(id);
  }

  public static async getProducers() {
    return await Producer.find();
  }

  public static async updateProducer(producer: ProducerDTO) {
    const { _id, ...rest } = producer;
    return await Producer.findByIdAndUpdate(_id, rest, {
      new: true,
    });
  }

  public static async deleteProductById(id: string) {
    return await Producer.deleteOne({ _id: id });
  }
}
