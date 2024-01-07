import { Request, Response } from 'express';
import path from 'node:path';
import { processCSVAndUpsert } from '../utils';
import { CSVProcessorDAO } from './csv-processor-dao';

export default class CSVProcessorController {
  static processCSV = (_req: Request, res: Response) => {
    const csvFilePath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'data',
      'all_listings.csv',
    );
    processCSVAndUpsert(csvFilePath, CSVProcessorDAO.upsertBatch);
    res.status(202).json({ success: true, message: 'CSV processing started' });
  };
}
