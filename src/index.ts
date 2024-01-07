import express from 'express';
import connectDB from './config/db';
import producerRouter from './producer/producer-routes';
import { errorHandler, notFound } from './middlewares/errorMiddleware';

const port = process.env.PORT || 3000;

const app = express();
connectDB().catch(console.error);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/error', (req, res) => {
  throw new Error('test');
});

app.use('/api/v1/producers', producerRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on('unhandledRejection', (reason) => {
  console.error(reason, 'unhandledRejection');
});

process.on('uncaughtException', (err) => {
  console.error(`UncaughtException: ${err.message}`);
  console.error(err);
  process.exit(1);
});
