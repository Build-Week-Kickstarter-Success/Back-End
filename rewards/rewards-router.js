/** @format */

const router = require('express').Router();
const Rewards = require('./rewards-model.js');
const restricted = require("../auth/restricted-middleware.js");


router.get('/', restricted, (req, res) => {
	Rewards.find()
		.then((rewards) => {
			res.status(200).json(rewards);
		})
		.catch((err) => {
			res.status(500).json({
				message: "Can't locate the Rewards. Here's why: ",
				err,
			});
		});
});

router.get('/:id', restricted, (req, res) => {
	const { id } = req.params;
	Rewards.findById(id)
		.then((reward) => {
			if (reward) {
				req.reward = reward;
				res.status(200).json(req.reward);
			} else {
				res.status(404).json({
					message:
						'The ID of this Reward is non-existant. Please check it and try again.',
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Something went wrong with the request. Here's some Info: ",
				error,
			});
		});
});

router.post('/', restricted, (req, res) => {
	const rewardInfo = req.body;
	Rewards.add(rewardInfo)
		.then(() => {
			if (!rewardInfo.name) {
				// throw new Error
				res.error(400).json({
					errorMessage: 'Please provide name and description for the post.',
				});
			}

		if (!rewardInfo.description) {
				// throw new Error
				res.error(400).json({
					errorMessage: 'Please provide name and description for the post.',
				});
			}

			res.status(201).json(rewardInfo);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: 'There was an error while saving the reward to the database: ',
				err,
			});
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Rewards.findById(id)
		.then((rew) => {
			if (rew) {
				Rewards.update(changes, id).then((updatedReward) => {
					res.json(updatedReward);
				});
			} else {
				res
					.status(404)
					.json({ message: 'Could not find Reward with given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to update Reward' });
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	Rewards.remove(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res
					.status(404)
					.json({ message: 'Could not find reward with given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to delete reward' });
		});
});

function validateId() {
	return (req, res, next) => {
		if (req.params.id) {
			Rewards.find(req.params.id)
				.then((reward) => {
					if (reward) {
						req.reward = reward;
						next();
					} else {
						res.status(400).json({
							message: "Whoops! Can't find that Reward. Try again.",
						});
					}
				})
				.catch((err) => {
					res.status(500).json({
						message: "Huh. Nothing's Happening. Check this out: ",
						err,
					});
				});
		} else {
			res.status(400).json({
				errorMessage: 'This is a little Embarrasing. Maybe try again?',
			});
		}
	};
}
module.exports = router;