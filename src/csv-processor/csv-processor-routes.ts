import express from 'express';
import CSVProcessorController from './csv-processor-controller';

const csvProcessorRoutes = express.Router();

csvProcessorRoutes.post('/', CSVProcessorController.processCSV);

export default csvProcessorRoutes;
