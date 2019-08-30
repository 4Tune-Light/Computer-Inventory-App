require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Routes = require('./routes')
const morgan = require('morgan')

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server Running on PORT: ${port}`)
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan('short'))

app.use('/api', Routes)

app.use(function(req, res, next) {
  var err = new Error('404 File Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
  	status: err.status,
  	error: true,
    message: err.message,
  });
});


