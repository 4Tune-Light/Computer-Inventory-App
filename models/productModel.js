const conn = require('../configs/db')



exports.getDatas = (data) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT a.id, a.name, a.description, a.image, a.id_category, b.name AS category, a.quantity, a.created_at, a.updated_at' + 
				      ' FROM products AS a INNER JOIN categories AS b ON a.id_category = b.id' +
				      ' WHERE a.name LIKE ?' +
				      ' ORDER BY ' + data.sortBy + ' '+ data.sort +' LIMIT ?, ?'
		
		conn.query(query, [data.search, data.offset, data.limit], (err, result) => {
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
		const query = 'SELECT a.id, a.name, a.description, a.image, a.id_category, b.name AS category, a.quantity, a.created_at, a.updated_at' + 
				      		' FROM products AS a INNER JOIN categories AS b ON a.id_category = b.id' +
				      		' WHERE a.id = ?'
		
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
		const query = 'INSERT products SET ?'
		
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
		const query = 'UPDATE products SET ? WHERE id = ?'
		
		conn.query(query, [data, id], (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}



exports.addOrReduce = (data, id) => {
	return new Promise((resolve, reject) => {

		let query = ''
		if (data.action == 'add') {
			query = 'UPDATE products SET quantity = quantity + ?, updated_at = ? WHERE id = ?'
			conn.query(query, [data.by, data.updated_at, id], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		} else if (data.action == 'reduce') {
			query = 'UPDATE products SET quantity = quantity - ?, updated_at = ? WHERE id = ? AND quantity > 0 AND quantity > ?'
			conn.query(query, [data.by, data.updated_at, id, data.by], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		} else {
			const err = new Error
	    err.status = 400
	    err.message = 'Wrong action type'
	    reject(err)
		}
	})
}



exports.deleteData = (id) => {
	return new Promise((resolve, reject) => {
		const query = 'DELETE FROM products WHERE id = ?'
		
		conn.query(query, id, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}