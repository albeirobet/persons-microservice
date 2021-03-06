// Created By Eyder Ascuntar Rosales
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');

// routes
const companyRoute = require('./src/routes/company/companyRoute')
const personRoute = require('./src/routes/person/personRoute');
const contactRoute = require('./src/routes/contact/contactRoute');
const productRoute = require('./src/routes/product/productRoute');
const unitRoute = require('./src/routes/unit-measurement/unitRoute');
const transactionRoute = require('./src/routes/transaction/transactionRoute');
const notFoundRoute = require('./src/routes/common/notFoundRoute');

const app = express();

app.use(cors());
// Permit All
app.options('*', cors());
// Select Permit
// app.use(
//   cors({
//     origin: 'http://localhost:4200'
//   })
// );

// ================= Set security HTTP headers
app.use(helmet());

// ================= Morgan, middleware to get url of request, only on dev enviroment Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ================= Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // One Hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
// app.use("/api", limiter);

// ================= Body parser, reading data from body into req.body
app.use(express.json());

// ================= To compress text response to clients
app.use(compression());

// ================= Ignore call favicon
app.use((req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
});

// ================= Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// ================= Data sanitization against XSS
app.use(xss());

// ================= ROUTES DEFINITION
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/person', personRoute);
app.use('/api/v1/contact', contactRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/unit', unitRoute);
app.use('/api/v1/transaction', transactionRoute);
app.all('*', notFoundRoute);

module.exports = app;
