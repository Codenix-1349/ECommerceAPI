import express from 'express';
import cors from 'cors';
import { connectDB } from '#db';
import { errorHandler, notFound } from '#middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

import routes from '#routes/index';

// Basic health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'eCommerce API is running' });
});

// Mount specialized routes here
app.use('/', routes);

// Catch-all route for unknown endpoints
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
