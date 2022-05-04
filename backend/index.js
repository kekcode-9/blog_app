import app from './server.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 8000;
const MongoURI = process.env.BLOG_DB_URI;
mongoose
  .connect(MongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((client) => {
    app.listen(port, () => console.log(`listening on port: ${port}`));
    })
  .catch((err) => console.log(err));