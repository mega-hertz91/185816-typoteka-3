'use strict';

const Joi = require(`joi`);

const Limit = {
  MIN: 10,
  MAX: 1000
};

const ErrorMessage = {
  MIN: `"message" Минимальное количество символов ${Limit.MIN}`,
  MAX: `"message" Максимальное количество символов ${Limit.MAX}`,
  EMPTY: `"message" Поле обязательно к заполнению`
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
