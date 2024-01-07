import ResourceNotFoundError from '../errors/resource-not-found-error';
import { ProductDTO } from './product-dto';
import Product from './product-mongoose-schema';

export class ProductDAO {
  public static async createProducts(products: ProductDTO[]) {
    return await Product.create(products);
  }

  public static async getProductById(id: string) {
    const product = await Product.findById(id).populate('producer');
    if (!product) {
      throw new ResourceNotFoundError();
    }
    return product;
  }

  public static async getProductsByProducerId(producerId: string) {
    return await Product.find({ producerId }).populate('producer');
  }

  public static async updateProduct(product: ProductDTO) {
    const { _id, ...rest } = product;
    return await Product.findByIdAndUpdate(_id, rest, {
      new: true,
    }).populate('producer');
  }

  public static async deleteProducts(ids: string[]) {
    if (ids.length === 0) return;
    else if (ids.length === 1) {
      return await Product.deleteOne({ _id: ids[0] });
    } else {
      return await Product.deleteMany({ _id: { $in: ids } });
    }
  }
}
