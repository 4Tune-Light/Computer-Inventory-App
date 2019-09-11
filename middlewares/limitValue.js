const conn = require('../configs/db');

function limitValue (req, res, next) {
  if ((isNaN(Number(req.query.page)) === false && isNaN(Number(req.query.limit)) === false) || (!req.query.page || !req.query.limit)) {
    req.limit = parseInt(req.query.limit) || 6
    req.offset = (parseInt(req.query.page) - 1) * req.limit || 0

		let query = 'SELECT COUNT(id) as total FROM products'
		
		conn.query(query, (err, result) => {
			if (req.offset > result[0].total) {
				const err = new Error
				err.status = 404
				err.message = '404 Page not found'
				next(err)
			} else {
				next()
			}
		})

  } else {
    var err = new Error
    err.status = 400
    err.message = 'Wrong insert value'
    next(err)
  }
}

module.exports.limitValue = limitValue;