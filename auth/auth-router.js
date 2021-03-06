/** @format */

const bcryptjs = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const Users = require('../users/users-model.js');
const { isValid } = require('../users/users-service.js');

router.post('/register', (req, res) => {
	const credentials = req.body;

	if (isValid(credentials)) {
		const rounds = process.env.BCRYPT_ROUNDS || 12;

		// hash the password
		const hash = bcryptjs.hashSync(credentials.password, rounds);

		credentials.password = hash;

		// save the user to the database
		Users.add(credentials)
			.then((user) => {
				res.status(201).json({ data: user });
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});
	} else {
		res.status(400).json({
			message:
				'please provide username and password and the password shoud be alphanumeric',
		});
	}
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (isValid(req.body)) {
		Users.findBy({ username: username })
			.then(([user]) => {
				// compare the password the hash stored in the database
				if (user && bcryptjs.compareSync(password, user.password)) {
					const token = generateToken(user);
					let userInfo = user.id;
					res.status(200).json({ message: `Welcome ${user.username} to our API`, token, userInfo });
				} else {
					res.status(401).json({ message: 'Invalid credentials' });
				}
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});
	} else {
		res.status(400).json({
			message:
				'please provide username and password and the password shoud be alphanumeric',
		});
	}
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		role: user.role,
	};
	const options = {
		expiresIn: '1d',
	};
	const secret = secrets.jwtSecret;

	return jwt.sign(payload, secret, options);
}

module.exports = router;
