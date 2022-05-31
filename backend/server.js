import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import articleRouter from './routes/article.routes.js';
import commentRouter from './routes/comment.routes.js';
import followsRouter from './routes/follows.routes.js';

import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();
import {default as connectMongo} from 'connect-mongo';

const app = express();
app.use(express.json());
app.use(cors());

const MongoURI = process.env.BLOG_DB_URI;
const MAX_AGE = process.env.MAX_AGE;

const mongoDBstore = connectMongo.create({
  mongoUrl: MongoURI,
  collection: "mySessions" // new collection to be created in our blog database for the sessions
});

app.use(
  session({
    secret: process.env.SESSION_SECRET, // for signing session key
    resave: true, //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //Forces a session that is "uninitialized" to be saved to the store
    store: mongoDBstore,
    cookie: {
      secure: false,
      path: '/',
      httpOnly: false,
      sameSite: false
    }
  })
);

// to user's route
app.use('/api/user', userRouter);

// to article's route
app.use('/api/article', articleRouter);

// to comment's route
app.use('/api/comment', commentRouter);

// to follow's route
app.use('/api/follows', followsRouter);

export default app;