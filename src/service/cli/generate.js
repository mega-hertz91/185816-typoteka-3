'use strict';

const fs = require(`fs`);
const path = require('path');
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const {
  CATEGORIES,
  SENTENCES,
  PictureRestrict,
  TITLES,
  OfferType,
  SumRestrict,
  DEFAULT_COUNT,
  FILE_NAME
} = require(`../../constants`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);


module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    try {
      fs.writeFileSync(`${path.dirname(__dirname)}/../${FILE_NAME}`, content, {encoding: `utf-8`});
    } catch (e) {
      console.log(e);
    }
  }
};
