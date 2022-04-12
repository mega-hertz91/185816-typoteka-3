'use strict';

const Joi = require(`joi`);

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': `"email" Введите email`,
    'string.empty': `"email" Введите email`,
    'string.email': `"email" Введите email в правильном формате`
  }),
  password: Joi.string().required().messages({
    'string.base': `"password" Введите пароль`,
    'string.empty': `"password" Введите пароль`
  })
});

module.exports = schema;
