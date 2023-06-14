import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  // throw new ApiError(401, 'Error')
  // Promise.reject(new Error('Unhandled Promise Error'))
  res.send('Server is running');
});

app.use(globalErrorHandler);

export default app;
