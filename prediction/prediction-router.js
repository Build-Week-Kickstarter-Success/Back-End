/** @format */

const router = require('express').Router();
const Pred = require('./prediction-model.js');
const restricted = require("../auth/restricted-middleware.js");


router.get('/', restricted, (req, res) => {
	Pred.find()
		.then((pred) => {
			res.status(200).json(pred);
		})
		.catch((err) => {
			res.status(500).json({
				message: "Can't locate the Prediction. Here's why: ",
				err,
			});
		});
});

router.get('/:id', restricted, (req, res) => {
	const { id } = req.params;
	Pred.findById(id)
		.then((pred) => {
			if (pred) {
				req.pred = pred;
				res.status(200).json(req.pred);
			} else {
				res.status(404).json({
					message:
						'The ID of this Prediction is non-existant. Please check it and try again.',
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
	const predInfo = req.body;
	Pred.add(predInfo)
		.then(() => {
			if (!predInfo.campaign_id) {
				// throw new Error
				res.error(400).json({
					errorMessage: 'Please provide name and description for the post.',
				});
			}
			res.status(201).json(predInfo);
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

	Pred.findById(id)
		.then((pred) => {
			if (pred) {
				Pred.update(changes, id).then((updatedPrediction) => {
					res.json(updatedPrediction);
				});
			} else {
				res
					.status(404)
					.json({ message: 'Could not find said Prediction with given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to update Prediction' });
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	Pred.remove(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res
					.status(404)
					.json({ message: 'Could not find prediction with given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to delete prediction' });
		});
});

function validateId() {
	return (req, res, next) => {
		if (req.params.id) {
			Pred.get(req.params.id)
				.then((pred) => {
					if (pred) {
						req.pred = pred;
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