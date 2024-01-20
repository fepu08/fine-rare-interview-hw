import express from 'express';
import connectDB from './config/db';
import producerRouter from './producer/producer-routes';
import productRouter from './product/product-routes';
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import csvProcessorRoutes from './csv-processor/csv-processor-routes';

const port = process.env.PORT || 3000;

const app = express();
connectDB().catch(console.error);

/* Middlewares */
app.use(express.json());

/* Routes */
app.get('/', (_req, res) => {
  res.send('API is running...');
});

app.use('/api/v1/producers', producerRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/csv-processor', csvProcessorRoutes);

/* Test Routes */
app.get('/test-error', (_req, _res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }
  throw new Error('test');
});

app.get('/test-uncaught-exception', (_req, _res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }
  setImmediate(() => {
    throw new Error('test');
  });
});

app.get('/test-unhandled-rejection', (_req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  new Promise((_resolve, reject) => {
    reject(new Error('Test unhandled rejection'));
  });
  res.send('Unhandled rejection test triggered');
});

/* Error middlewares & Event Listeners */
app.use(notFound);
app.use(errorHandler);

process.on('unhandledRejection', (reason) => {
  console.error(reason, 'unhandledRejection');
});

process.on('uncaughtException', (err) => {
  console.error(`UncaughtException: ${err.message}`);
  console.error(err);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
