'use strict';

const Joi = require(`joi`);

const ErrorMessage = {
  CATEGORIES: `Это обязательное поле`,
  TITLE_MIN: `Минимальное количество символов 10`,
  TITLE_MAX: `Максимальное количество символов 100`,
  ANNOUNCE_MIN: `Минимальное количество символов 10`,
  ANNOUNCE_MAX: `Максимальное количество символов 150`,
  DESCRIPTION_MIN: `Минимальное количество символов 10`,
  DESCRIPTION_MAX: `Максимальное количество символов 300`
};

const schema = Joi.object({
  categories: Joi.array().items(Joi.number().integer().positive().messages({
    'number.base': ErrorMessage.CATEGORIES
  })).min(1).required(),
  title: Joi.string().min(10).max(100).required().messages({
    'string.min': ErrorMessage.TITLE_MIN,
    'string.max': ErrorMessage.TITLE_MAX
  }),
  announce: Joi.string().min(10).max(150).required().messages({
    'string.min': ErrorMessage.ANNOUNCE_MIN,
    'string.max': ErrorMessage.ANNOUNCE_MAX
  }),
  description: Joi.string().min(10).max(300).required().messages({
    'string.min': ErrorMessage.DESCRIPTION_MIN,
    'string.max': ErrorMessage.DESCRIPTION_MAX
  }),
  preview: Joi.string().allow(null, ``),
  userId: Joi.number()
});

module.exports = schema;
