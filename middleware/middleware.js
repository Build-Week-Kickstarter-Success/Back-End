function validateCampaign(req, res, next) {
    if (!(Object.keys(req.body).length === 0)) {
      if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" });
      } 
      if (!req.body.video) {
        res.status(400).json({ message: "missing required video field" });
      }
      if (!req.body.description) {
        res.status(400).json({ message: "missing required description field" });
      }
      else {
        next();
      }
    } else {
      res.status(400).json({ message: "missing post data" });
    }
  }

  module.exports = {
      validateCampaign
  };