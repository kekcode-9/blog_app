import app from './server.js';
import dotenv from 'dotenv';
//import mongodb from 'mongodb';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.BLOG_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((client) => {
    app.listen(port, () => console.log(`listening on port: ${port}`));
    })
  .catch((err) => console.log(err));
/*
const MongoClient = mongodb.MongoClient;
MongoClient.connect(process.env.BLOG_DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then((client) => {
    app.listen(port, () => console.log(`listening on port: ${port}`));
}).catch((err) => console.log(`error: ${err}`));*/
