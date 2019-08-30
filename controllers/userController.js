require('dotenv').config()
const conn = require('../configs/db');
const jwt = require('jsonwebtoken')
const model = require('../models/userModel')

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);


exports.createUser = (req, res, next) => {
  const {username, password, email} = req.body;  

  if (!username || !password|| !email) {
		  const err = new Error
		  err.status = 400
		  err.message = 'Username, password, and email are required'
		  reject(err)
	}

  model.verifyUsername(username)
  	.then(exist => {
  		model.verifyEmail(email)
  			.then(exist => {
  				let data = {username, email}

  				bcrypt.genSalt(saltRounds, function(err, salt) {
					  bcrypt.hash(password, salt, function(err, hash) {
					  	if (err) {
					  		err.status = 400
					  		err.message = '400 Bad Request'
					  		next(err);
					  	} else {
					  		data.password = hash
					  		model.createData(data)
					  			.then(result => {
					  				const token = jwt.sign({username, email}, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXP })
					  				res.json({
								      status: 200,
								      error: false,
								      message: `Success to register`,
								      id: result.insertId,
								      data,
								      token
								    })
					  			})
						    .catch(err => {
						      err.status = 400
						      err.message = `Failed to register`
						      next(err);
						    })
							}
					  })
					})
					
  			})
  			.catch(err => next(err))
  	})
  	.catch(err => next(err))

  
  
	
}



exports.loginUser = (req, res, next) => {
  const {email, password} = req.body

	if (!email|| !password) {
    const err = new Error
    err.status = 400
    err.message = 'Email and password are required'
    next(err)
  }

  model.getData(email)
    .then(result => {
      if (result.length > 0) {
      	bcrypt.compare(password, result[0].password, function(err, match) {
	    		if (match) {
	    			const token = jwt.sign({username: result[0].username, email: result[0].email}, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXP });
						res.status(200).json({
							status: 200,
							error: false,
							user: {
								id: result[0].id,
								username: result[0].username,
								email: result[0].email
							},
							token
						})
					} else {
						const err = new Error
		        err.status = 400
		        err.message = 'Email or password is wrong'
		        next(err);
					}
				})
      } else {
      	const err = new Error
        err.status = 400
        err.message = 'Email does not exist'
        next(err);
      }
    })
    .catch(err => {
    	err.status = 400
    	err.message = '400 Bad Request'
    	next(err)
    })
}