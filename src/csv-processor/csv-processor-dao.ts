import { ProducerDAO } from '../producer/producer-dao';
import { ProductIntermediate } from '../product/product-dto';
import Product from '../product/product-mongoose-schema';

export class CSVProcessorDAO {
  public static upsertBatch = async (batch: ProductIntermediate[]) => {
    for (const item of batch) {
      const producer = await ProducerDAO.createProducer(item.producer);

      const uniqueIdentifier = `${item.vintage}-${
        item.name
      }-${producer._id.toString()}`;

      const productData = {
        ...item,
        producerId: producer._id,
      };

      await Product.updateOne(
        { uniqueIdentifier: uniqueIdentifier },
        { $set: productData },
        { upsert: true },
      );
      console.log(`updated: ${JSON.stringify(productData)}`);
    }
  };
}
