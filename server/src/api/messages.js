const express = require('express');
const Joi = require('joi');

const router = express.Router();
const db = require('../db');
const messages = db.get('messages');

const schema = Joi.object().keys({
  tripID: Joi.string().min(1).max(100).required(),
  message: Joi.string().min(1).max(100).required()
});


router.get('/', (req, res) => {
  messages
    .find()
    .then(allMessages => {
      res.json(allMessages)
    })
});

router.post('/', (req, res, next) => {
  console.log(req);
  const result = Joi.validate(req.body, schema);
  if(result.error == null){
    const {tripID , message } = req.body;
    const userTripID = {
      tripID,
      message,
      date: new Date()
    };
    messages
      .insert(userTripID)
      .then(insertedMessage => {
        res.json(insertedMessage);
      })
  }
  else {
    next(result.error);
  }

});




module.exports = router;
