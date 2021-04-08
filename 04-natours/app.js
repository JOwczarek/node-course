const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  //morgan is for logging
  app.use(morgan('dev'));
}

//use middlewear to access body of post
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middlewear!');
  next();
});

/**
 * Call next on custome middlewear to have
 * request to continue on the middlewear stack
 */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//route handlers

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//Mounting new router on route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
