import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit'; // ✅ Import rate limiter
import { PaymentRoutes } from './app/modules/payment/payment.route';
import path from 'path';
import globalErrorHandler from './app/Middlewar/globalErrorHandler';
import config from './app/config';
import { AuthRoutes } from './app/modules/auth.route';

const app: Application = express();

// ✅ Rate limiter configuration (adjust as needed)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ Apply the rate limiter to all requests
app.use(limiter);

const corsOptions = {
  origin: config.Client_url,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/api', AuthRoutes);
app.use('/api', PaymentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the backend server');
});

//Global error handler
app.use(globalErrorHandler);

// Global "Not Found" handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
});

export default app;
