import express from 'express';
import connectDB from './config/db';

const port = process.env.PORT || 3000;

const app = express();
connectDB().catch(console.error);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
