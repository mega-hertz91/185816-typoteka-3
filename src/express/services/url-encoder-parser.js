'use strict';

const jsonParser = require(`body-parser`);

module.exports = jsonParser.urlencoded({extended: false});
