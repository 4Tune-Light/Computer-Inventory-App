require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Routes = require('./routes')

const port = process.env.PORT || 3000;

app.listen(2000, () => {
	console.log(`Server Running on PORT: ${port}`)
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/api', Routes)


