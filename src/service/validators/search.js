'use strict';

const Joi = require(`joi`);

const ErrorMessage = {
  NAME: `Поле должно быть строкой`
};

const schema = Joi.object({
  name: Joi.string().required().messages({
    'string.required': ErrorMessage.NAME
  })
});

module.exports = schema;
