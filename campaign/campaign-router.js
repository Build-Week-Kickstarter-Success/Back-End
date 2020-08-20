/** @format */

const router = require('express').Router();

const Campaign = require('./campaign-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', (req, res) => {
	Campaign.find()
		.then((campaign) => {
			res.status(200).json(campaign);
		})
		.catch((err) => {
			res.status(500).json({
				message: "Can't locate the Campaign. Here's why: ",
				err,
			});
		});
});

router.get('/:id', restricted, (req, res) => {
	const { id } = req.params;
	Campaign.find(id)
		.then((camp) => {
			if (camp) {
				req.camp = camp;
				res.status(200).json(req.camp);
			} else {
				res.status(404).json({
					message:
						'The ID of this Campaign is non-existant. Please check it and try again.',
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
	const CampInfo = req.body;
	Campaign.insert(CampInfo)
		.then(() => {
			if (!CampInfo.name) {
				// throw new Error
				res.error(400).json({
					errorMessage: 'Please provide name and description for the post.',
				});
			}

			if (!CampInfo.description) {
				// throw new Error
				res.error(400).json({
					errorMessage: 'Please provide name and description for the post.',
				});
			}

			res.status(201).json(CampInfo);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: 'There was an error while saving the campaing to the database: ',
				err,
			});
		});
});

router.put('/:id', restricted, validateId, (req, res) => {
	Campaign.update(req.params.id, req.body)
		.then((camp) => {
			res.status(200).json(camp);
		})
		.catch((error) => {
			res.status(500).json({
				message: "Can't update for some reason. Here's some info: ",
				error,
			});
		});
});

router.get('/:id/rewards', restricted, validateId, (req, res, next) => {
	const { id } = req.params;

	Campaign.rewardsByCampaign(id)
		.then((rewards) => {
			if (rewards.length) {
				res.json(rewards);
			} else {
				res
					.status(404)
					.json({ message: 'could not find rewards for campaign' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to get rewards', err });
		});
});

router.get('/:id/updates', restricted, validateId, (req, res, next) => {
	const { id } = req.params;

	Campaign.updatesByCampaign(id)
		.then((upd) => {
			if (upd.length) {
				res.json(upd);
			} else {
				res
					.status(404)
					.json({ message: 'could not find updates for campaign' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to get updates', err });
		});
});

router.get('/:id/rewardupdate', restricted, validateId, (req, res, next) => {
	const { id } = req.params;

	Campaign.RandUByCampaign(id)
		.then((ru) => {
			if (ru.length) {
				res.json(ru);
			} else {
				res.status(404).json({ message: 'No Rewards nor Updates found.' });
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: 'failed to get infomation. You sure this exists? ',
				err,
			});
		});
});

function validateId() {
	return (req, res, next) => {
		if (req.params.id) {
			Campaign.get(req.params.id)
				.then((camp) => {
					if (camp) {
						req.camp = camp;
						next();
					} else {
						res.status(400).json({
							message: "Whoops! Can't find that Project. Try again.",
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
