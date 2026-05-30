import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Example route getting services
app.get('/api/services', async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

import authRouter from './routes/auth';
import aiRouter from './routes/ai';
import appointmentsRouter from './routes/appointments';

app.use('/api/auth', authRouter);
app.use('/api/ai', aiRouter);
app.use('/api/appointments', appointmentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
