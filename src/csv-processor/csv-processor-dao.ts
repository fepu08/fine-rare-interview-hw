import { ProducerDAO } from '../producer/producer-dao';
import { ProductIntermediate } from '../product/product-dto';
import Product from '../product/product-mongoose-schema';
import { getUniqueIdentifierFrom } from '../utils';

export class CSVProcessorDAO {
  public static upsertBatch = async (batch: ProductIntermediate[]) => {
    for (const item of batch) {
      const producer = await ProducerDAO.createProducer(item.producer);

      const productData = {
        ...item,
        producerId: producer._id,
      };

      await Product.updateOne(
        {
          uniqueIdentifier: getUniqueIdentifierFrom(
            item.vintage,
            item.name,
            producer._id.toString(),
          ),
        },
        { $set: productData },
        { upsert: true },
      );
      console.log(`updated: ${JSON.stringify(productData)}`);
    }
  };
}
