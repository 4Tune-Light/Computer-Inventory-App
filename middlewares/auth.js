const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	const token = req.headers['auth'];

	if (typeof token == 'undefined') {
		res.status(401)
		res.json({
			status: 401,
			message: 'Forbidden Access'
		})
	} else {
		jwt.verify(token, process.env.JWT_KEY, (err, data) => {
			if (err) {
				res.status(401)
				res.json({
					status: 401,
					message: 'Forbidden access, invalid token'
				})
			} else {
				next();
			}
		})
	}
}

module.exports.verifyToken = verifyToken;