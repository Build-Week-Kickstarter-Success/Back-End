/** @format */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const restricted = require("../auth/restricted-middleware.js");
const checkRole = require('../auth/check-role-middleware.js');

//authorization + Userbase
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router');

//routes for campaigns, and resources for them.
const campaignRouter = require('../campaign/campaign-router.js');
const rewardsRouter = require('../rewards/rewards-router');
const updRouter = require('../updates/updates-router');
const PredictionRouter = require('../prediction/prediction-router')

const server = express();

server.use(helmet());
server.use(cors());

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, checkRole(1), usersRouter);

server.use('/api/campaign', restricted, campaignRouter);
server.use('/api/rewards', restricted, rewardsRouter);
server.use('/api/updates', restricted, updRouter);
server.use('/api/prediction', restricted, PredictionRouter)


server.get('/', (req, res) => {
	const messageOfTheDay = process.env.MOTD || 'Hello World';
	res.send(
		`<h2>Hi There! Let's get into some Campaigning! ${messageOfTheDay}</h2>`
	);
	res.status(200).json({ api: 'up', MOTD: messageOfTheDay });
});

module.exports = server;
