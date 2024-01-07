import express from 'express';
import ProducerController from './producer-controller';

const producerRouter = express.Router();

producerRouter
  .route('/')
  .post(ProducerController.createProducer)
  .put(ProducerController.updateProducer)
  .get(ProducerController.getProducers);

producerRouter
  .route('/:id')
  .get(ProducerController.getProducerById)
  .delete(ProducerController.deleteProducer);

export default producerRouter;
