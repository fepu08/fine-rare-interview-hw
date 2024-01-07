import { Request, Response } from 'express';
import asyncHandler from '../middlewares/async-handler';
import { ProducerDTO } from './producer-dto';
import { ProducerDAO } from './producer-dao';
import ResourceNotFoundError from '../errors/resource-not-found-error';

export default class ProducerController {
  /**
   * @desc 		Create Producer
   * @route 	POST /api/v1/producers
   * @access 	Public
   */
  static createProducer = asyncHandler(async (req: Request, res: Response) => {
    const result = await ProducerDAO.createProducer(req.body as ProducerDTO);

    res.status(201).json({
      _id: result._id,
      name: result.name,
      region: result.region,
      country: result.country,
    });
  });

  /**
   * @desc 		Get All Producer
   * @route 	POST /api/v1/producers
   * @access 	Public
   */
  static getProducers = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json(await ProducerDAO.getProducers());
  });

  /**
   * @desc 		Get Producer By its ID
   * @route 	POST /api/v1/producers/:id
   * @access 	Public
   */
  static getProducerById = asyncHandler(async (req: Request, res: Response) => {
    const response = await ProducerDAO.getProducerById(req.params.id);
    if (!response) {
      throw new ResourceNotFoundError();
    }
    res.status(200).json(response);
  });

  /**
   * @desc 		Update Producer
   * @route 	PUT /api/v1/producers
   * @access 	Public
   */
  static updateProducer = asyncHandler(async (req: Request, res: Response) => {
    const response = await ProducerDAO.updateProducer(req.body as ProducerDTO);
    if (!response) {
      throw new ResourceNotFoundError();
    }

    res.status(200).send(response);
  });

  /**
   * @desc 		Delete Producer
   * @route 	DELETE /api/v1/producers/:id
   * @access 	Public
   */
  static deleteProducer = asyncHandler(async (req: Request, res: Response) => {
    const response = await ProducerDAO.deleteProductById(req.params.id);
    if (response.deletedCount === 0) {
      throw new ResourceNotFoundError();
    }
    res.status(202).send();
  });
}
