const conn = require('../configs/db')



exports.createData = (data) => {
	return new Promise((resolve, reject) => {
		const query = 'INSERT users SET ?'
		
		conn.query(query, data, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}



exports.getData = (email) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM users WHERE email = ?'
		
		console.log(email)
		console.log(query)
		conn.query(query, email, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}


exports.verifyUsername = (username) => {
	return new Promise((resolve, reject) => {
		conn.query('SELECT * FROM users WHERE username = ?', username, function (err, result) {
  		if (err) {
  			reject(err);
  		} else {
  			if (result.length > 0) {
  				const err = new Error
  				err.status = 409
  				err.message = 'Username alredy exist'
  				reject(err)
  			} else {
  				const exist = false;
  				resolve(exist)
  			}
  		}
  	})
	})
}

exports.verifyEmail = (email) => {
	return new Promise((resolve, reject) => {
		conn.query('SELECT * FROM users WHERE email = ?', email, function (err, result) {
  		if (err) {
  			reject(err);
  		} else {
  			if (result.length > 0) {
  				const err = new Error
  				err.status = 409
  				err.message = 'Email alredy exist'
  				reject(err)
  			} else {
  				const exist = false;
  				resolve(exist)
  			}
  		}
  	})
	})
}