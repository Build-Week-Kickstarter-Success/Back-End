/** @format */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const restricted = require("../auth/restricted-middleware.js");
const checkRole = require('../auth/check-role-middleware.js');

const authRouter = require('../auth/auth-router.js');
const campaignRouter = require('../campaign/campaign-router.js');
const usersRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(cors());

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/campaign', restricted, checkRole(1,2), campaignRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
	const messageOfTheDay = process.env.MOTD || 'Hello World';
	res.send(
		`<h2>Hi There! Let's get into some Campaigning! ${messageOfTheDay}</h2>`
	);
	res.status(200).json({ api: 'up', MOTD: messageOfTheDay });
});

module.exports = server;
