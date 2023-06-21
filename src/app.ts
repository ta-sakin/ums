import express, { Application, NextFunction, Request, Response } from 'express';
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

//global error handler
app.use(globalErrorHandler);

//not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    success: false,
    message: 'Not found',
    errorMessages: [{ path: req.originalUrl, message: 'API route not found' }],
  });
  next();
});
export default app;
