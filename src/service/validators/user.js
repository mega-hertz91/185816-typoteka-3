'use strict';

const Joi = require(`joi`);

const Limit = {
  PASSWORD_MIN_LIMIT: 6
};

const ErrorMessage = {
  FIRST_NAME_EMPTY: `"firstName" Введите имя`,
  LAST_NAME_EMPTY: `"lastName" Введите фамилию`,
  PASSWORD_EMPTY: `"password" Введите пароль`,
  PASSWORD_MIN_LIMIT: `"password" Пароль должен быть не менее 6 символов`,
  EMAIL_EMPTY: `"email" Введите email`,
  EMAIL_CORRECT: `"email" Введите email в правильном формате`
};

const schema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.base': ErrorMessage.FIRST_NAME_EMPTY,
    'string.empty': ErrorMessage.FIRST_NAME_EMPTY
  }),
  lastName: Joi.string().required().messages({
    'string.base': ErrorMessage.LAST_NAME_EMPTY,
    'string.empty': ErrorMessage.LAST_NAME_EMPTY
  }),
  email: Joi.string().email().required().messages({
    'string.base': ErrorMessage.EMAIL_EMPTY,
    'string.empty': ErrorMessage.EMAIL_EMPTY,
    'string.email': ErrorMessage.EMAIL_CORRECT
  }),
  password: Joi.string().min(Limit.PASSWORD_MIN_LIMIT).required().messages({
    'string.base': ErrorMessage.PASSWORD_EMPTY,
    'string.empty': ErrorMessage.PASSWORD_EMPTY,
    'string.min': ErrorMessage.PASSWORD_MIN_LIMIT
  }),
  avatar: Joi.string().required()
});

module.exports = schema;
