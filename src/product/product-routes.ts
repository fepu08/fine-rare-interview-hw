import express from 'express';
import ProductController from './product-controller';

const productRouter = express.Router();

productRouter
  .route('/')
  .post(ProductController.createProducts)
  .get(ProductController.getProductsByProducerId)
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProducts);
productRouter.route('/:id').get(ProductController.getProductById);

export default productRouter;
