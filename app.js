import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

// Import v1 routes
import userRoutesV1 from './src/v1/routes/user.js';

const app = express();

const apiURLV1 = '/api/v1';
var db_url = '';

if (process.env.NODE_ENV === 'dev') {
  db_url = process.env.DB_URL_ATLAS;
  app.use(morgan('dev'));
}
else {
  db_url = process.env.DB_URL_ATLAS;
}

mongoose
  .connect(`${db_url}`)
  .then(() => {
    console.log(`Connected to database in mode ${process.env.NODE_ENV}`);
    // Set CORS headers after retrieving credentials
    app.use(cors());
  })
  .catch(err => {
    console.log(err);
  });


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.json());
app.use(`${apiURLV1}/users`, userRoutesV1);

export default app;
