'use strict';

const Joi = require(`joi`);

const Limit = {
  TITLE_MIN: 30,
  TITLE_MAX: 250,
  ANNOUNCE_MIN: 30,
  ANNOUNCE_MAX: 250,
  DESCRIPTION_MIN: 30,
  DESCRIPTION_MAX: 1000
};

const ErrorMessage = {
  CATEGORIES: `"categories" Нужно выбрать хотя бы одну категорию`,
  TITLE_EMPTY: `"title" Поле обязательно к заполнению`,
  TITLE_MIN: `"title" Минимальное количество символов ${Limit.TITLE_MIN}`,
  TITLE_MAX: `"title" Максимальное количество символов ${Limit.TITLE_MAX}`,
  ANNOUNCE_EMPTY: `"announce" Поле обязательно к заполнению`,
  ANNOUNCE_MIN: `"announce" Минимальное количество символов ${Limit.ANNOUNCE_MIN}`,
  ANNOUNCE_MAX: `"announce" Максимальное количество символов ${Limit.ANNOUNCE_MAX}`,
  DESCRIPTION_EMPTY: `"description" Поле обязательно к заполнению`,
  DESCRIPTION_MIN: `"description" Минимальное количество символов ${Limit.DESCRIPTION_MIN}`,
  DESCRIPTION_MAX: `"description" Максимальное количество символов ${Limit.DESCRIPTION_MAX}`
};

const schema = Joi.object({
  categories: Joi.array().items(Joi.number().integer().positive().messages({
    'number.base': ErrorMessage.CATEGORIES
  })).min(1).required(),
  title: Joi.string().min(Limit.TITLE_MIN).max(Limit.TITLE_MAX).required().messages({
    'string.bae': ErrorMessage.TITLE_EMPTY,
    'string.empty': ErrorMessage.TITLE_EMPTY,
    'string.min': ErrorMessage.TITLE_MIN,
    'string.max': ErrorMessage.TITLE_MAX
  }),
  announce: Joi.string().min(Limit.ANNOUNCE_MIN).max(Limit.ANNOUNCE_MAX).required().messages({
    'string.bae': ErrorMessage.ANNOUNCE_EMPTY,
    'string.empty': ErrorMessage.ANNOUNCE_EMPTY,
    'string.min': ErrorMessage.ANNOUNCE_MIN,
    'string.max': ErrorMessage.ANNOUNCE_MAX
  }),
  description: Joi.string().min(Limit.DESCRIPTION_MIN).max(Limit.DESCRIPTION_MAX).required().messages({
    'string.bae': ErrorMessage.DESCRIPTION_EMPTY,
    'string.empty': ErrorMessage.DESCRIPTION_EMPTY,
    'string.min': ErrorMessage.DESCRIPTION_MIN,
    'string.max': ErrorMessage.DESCRIPTION_MAX
  }),
  preview: Joi.string().allow(null, ``),
  userId: Joi.number(),
  createdAt: Joi.string()
});

module.exports = schema;
