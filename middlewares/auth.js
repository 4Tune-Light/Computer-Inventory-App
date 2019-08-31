const jwt = require('jsonwebtoken');
const decode = require('jwt-decode')

function verifyToken(req, res, next) {
	const {auth, username, email} = req.headers

	if (typeof auth == 'undefined' || typeof username == 'undefined' || typeof email == 'undefined') {
		res.status(401)
		res.json({
			status: 401,
			message: 'Forbidden Access'
		})
	} else {
		const decoded = decode(auth)
		if (decoded.username == username && decoded.email == email) {
			jwt.verify(auth, process.env.JWT_KEY, (err, data) => {
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
		} else {
			res.status(401)
			res.json({
				status: 401,
				message: 'Forbidden access, invalid token'
			})
		}
		
	}
}

module.exports.verifyToken = verifyToken;