'use strict';

const Joi = require(`joi`);

const Limit = {
  MIN: 10,
  MAX: 150
};

const ErrorMessage = {
  MIN: `"name" Минимальное количество символов ${Limit.MIN}`,
  MAX: `"name" Максимальное количество символов ${Limit.MAX}`,
  EMPTY: `"name" Поле обязательно к заполнению`
};

const schema = Joi.object({
  message: Joi.string().required().min(Limit.MIN).max(Limit.MAX).messages({
    'string.max': ErrorMessage.MAX,
    'string.min': ErrorMessage.MIN,
    'string.base': ErrorMessage.EMPTY,
    'string.empty': ErrorMessage.EMPTY
  }),
  userId: Joi.number().required(),
  publicationId: Joi.number().required()
});

module.exports = schema;
