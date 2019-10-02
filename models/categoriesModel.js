const conn = require('../configs/db')


exports.getDatas = search => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM categories WHERE name LIKE ?'
			conn.query(query, search, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}



exports.getData = (id) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM categories WHERE id = ?'
		
		conn.query(query, id, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}



exports.createData = (data) => {
	return new Promise((resolve, reject) => {
		const query = 'INSERT categories SET ?'
		
		conn.query(query, data, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}

exports.updateData = (data, id) => {
	return new Promise((resolve, reject) => {
		const query = 'UPDATE categories SET ? WHERE id = ?'
		
		conn.query(query, [data, id], (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}

exports.deleteData = (id) => {
	return new Promise((resolve, reject) => {
		const query = 'DELETE FROM categories WHERE id = ?'
		
		conn.query(query, id, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}