import { Request, Response } from 'express';
import asyncHandler from '../middlewares/async-handler';
import { ProductDAO } from './product-dao';
import ResourceNotFoundError from '../errors/resource-not-found-error';
import { DeleteProductRequestBody, ProductDTO } from './product-dto';
import InvalidRequestDataError from '../errors/invalid-request-data-error';

export default class ProductController {
  /**
   * @desc 		Create Products
   * @route 	POST /api/v1/products
   * @access 	Public
   */
  static createProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = (req.body as ProductDTO[]).filter((product) => {
      if (product.name || product.producerId || product.vintage) {
        return product;
      }
    });
    if (!products || products.length === 0) {
      throw new InvalidRequestDataError();
    }

    const response = await ProductDAO.createProducts(req.body as ProductDTO[]);
    if (!response) {
      throw new ResourceNotFoundError();
    }

    res.status(201).send(response);
  });

  /**
   * @desc 		Get Product By its ID
   * @route 	POST /api/v1/products/:id
   * @access 	Public
   */
  static getProductById = asyncHandler(async (req: Request, res: Response) => {
    const result = await ProductDAO.getProductById(req.params.id);
    if (!result) {
      throw new ResourceNotFoundError();
    }

    res.status(200).json(result);
  });

  /**
   * @desc 		Get Product by Producer ID
   * @route 	GET /api/v1/products?producerId={producer ID}
   * @access 	Public
   */
  static getProductsByProducerId = asyncHandler(
    async (req: Request, res: Response) => {
      if (!req.query.producerId) {
        throw new InvalidRequestDataError('Missing query param: producerId');
      }

      const result = await ProductDAO.getProductsByProducerId(
        req.query.producerId as string,
      );

      res.status(200).json(result);
    },
  );

  /**
   * @desc 		Update Product
   * @route 	PUT /api/v1/products
   * @access 	Public
   */
  static updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const response = await ProductDAO.updateProduct(req.body as ProductDTO);
    if (!response) {
      throw new ResourceNotFoundError();
    }

    res.status(201).send(response);
  });

  /**
   * @desc 		Delete Products
   * @route 	DELETE /api/v1/products
   * @access 	Public
   */
  static deleteProducts = asyncHandler(async (req: Request, res: Response) => {
    const productIds = (req.body as DeleteProductRequestBody).productIds;
    if (!productIds) {
      throw new InvalidRequestDataError();
    }
    const response = await ProductDAO.deleteProducts(
      (req.body as DeleteProductRequestBody).productIds,
    );
    if (!response || response.deletedCount === 0) {
      throw new ResourceNotFoundError();
    }
    res.status(202).send();
  });
}
