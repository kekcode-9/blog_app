import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import articleRouter from './routes/article.routes.js';
import commentRouter from './routes/comment.routes.js';

const app = express();
app.use(express.json());
app.use(cors());

// to user's route
app.use('/api/user', userRouter);

// to article's route
app.use('/api/article', articleRouter);

// to comment's route
app.use('/api/comment', commentRouter);

export default app;