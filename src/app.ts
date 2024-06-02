import express from 'express';
import userRoutes from './routes/userRoute';
import taskRoutes from './routes/taskRoute';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/users', taskRoutes);

export default app;