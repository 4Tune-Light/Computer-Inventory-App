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