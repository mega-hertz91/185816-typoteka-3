'use strict';

const Joi = require(`joi`);

const ErrorMessage = {
  MIN: `Минимальное количество символов 10`,
  MAX: `Максимальное количество символов 150`
};

const schema = Joi.object({
  message: Joi.string().required().min(10).max(150).messages({
    'string.max': ErrorMessage.MAX,
    'string.min': ErrorMessage.MIN
  }),
  userId: Joi.number().required()
});

module.exports = schema;
