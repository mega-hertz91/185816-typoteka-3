'use strict';

const Joi = require(`joi`);

const Limit = {
  MIN: 5,
  MAX: 30
};

const ErrorMessage = {
  MIN: `"name" Минимальное количество символов ${Limit.MIN}`,
  MAX: `"name" Максимальное количество символов ${Limit.MAX}`,
  EMPTY: `"name" Поле обязательно к заполнению`
};

const schema = Joi.object({
  name: Joi.string().required().min(Limit.MIN).max(Limit.MAX).messages({
    'string.base': ErrorMessage.EMPTY,
    'string.empty': ErrorMessage.EMPTY,
    'string.max': ErrorMessage.MAX,
    'string.min': ErrorMessage.MIN,
  })
});

module.exports = schema;
