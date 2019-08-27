require('dotenv').config()
const conn = require('../configs/db');
const jwt = require('jsonwebtoken')

exports.createUser = (req, res) => {
  const {username, password, email} = req.body;
  const time = new Date();

  if (!username || !password|| !email) {
    res.status(300).json({
      status: 300,
      message: 'Username, password, and email are needed'
    })
  }

  const q = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  conn.query(q, [username, password, email], (err, result) => {
    if (err) {
      res.status(500).json({
        status: 500,
        error: true,
        message: 'Register Failed'
      })
    } else {
			const token = jwt.sign({username, email}, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXP })

      res.status(200).json({
        status: 200,
        error: false,
        message: 'Register Successful',
        id: result.insertId,
        data: {
        	username,
        	email,
        	token
        }
      });
    }
  })
}

exports.loginUser = (req, res) => {
	const {email, password} = req.body

	if (!email || !password) {
		res.status(300).json({
			status: 300,
			error: true,
			message: 'Email and password are needed'
		})
	}

	conn.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
		if (err) {
			res.status(500).json({
				status: 500,
				error: true,
				message: 'Login Failed'
			})
		} else {
			if (result[0].password == password) {
				const token = jwt.sign({username: result[0].username, email: result[0].email}, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXP })
				res.status(200).json({
					status: 200,
					error: false,
					user: {
						id: result[0].id,
						username: result[0].username,
						email: result[0].email
					},
					token: token
				})
			} else {
				console.log(result[0])
				res.status(300).json({
					status: 300, 
					error: true,
					message: 'Wrong password or email'
				})
			}
		}
	})
}