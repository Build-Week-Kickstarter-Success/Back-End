/** @format */

const router = require('express').Router();
const Updates = require('./updates-model.js');
const restricted = require("../auth/restricted-middleware.js");


router.get('/', restricted, (req, res) => {
	Updates.find()
		.then((upd) => {
			res.status(200).json(upd);
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
	Updates.findById(id)
		.then((upd) => {
			if (upd) {
				req.upd = upd;
				res.status(200).json(req.upd);
			} else {
				res.status(404).json({
					message:
						'The ID of this Update is non-existant. Please check it and try again.',
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
	const UpdInfo = req.body;
	Updates.add(UpdInfo)
		.then(() => {
			if (!UpdInfo.name) {
				// throw new Error
				res.error(400).json({
					errorMessage: 'Please provide name and description for the post.',
				});
			}

			if (!UpdInfo.description) {
				// throw new Error
				res.error(400).json({
					errorMessage: 'Please provide name and description for the post.',
				});
			}

			res.status(201).json(UpdInfo);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: 'There was an error while saving the campaing to the database: ',
				err,
			});
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Updates.findById(id)
		.then((upd) => {
			if (upd) {
				Updates.update(changes, id).then((updatedupd) => {
					res.json(updatedupd);
				});
			} else {
				res
					.status(404)
					.json({ message: 'Could not find Update with given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to update Update' });
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	Updates.remove(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res
					.status(404)
					.json({ message: 'Could not find update with given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to delete update' });
		});
});

function validateId() {
	return (req, res, next) => {
		if (req.params.id) {
			Updates.find(req.params.id)
				.then((upd) => {
					if (upd) {
						req.upd = upd;
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