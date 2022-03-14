'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);


module.exports = (app, PublicationDataService) => {
  const router = new Router();
  app.use(`/publications`, router);

  /**
   * Get all items
   *
   * @return {Array}
   */
  router.get(`/`, async (req, res) => {
    try {
      const items = await PublicationDataService.getAll();

      res.send(items);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send({success: false, error: e.message});
    }
  });

  /**
   * Get by ID
   *
   * @return {object|string}
   */
  router.get(`/:id`, async (req, res) => {
    try {
      const item = await PublicationDataService.getById(req.params.id);
      if (item) {
        res.send(item);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send({success: true, message: `not found`});
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send({success: false, error: e.message});
    }
  });

  /**
   * Create item
   * @return {object|string}
   */
  router.post(`/`, async (req, res) => {
    try {
      const item = await PublicationDataService.create(req.body);

      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(item);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send({success: false, error: e.message});
    }
  });

  /**
   * Update item
   * @return {object}
   */

  router.put(`/:id`, async (req, res) => {
    try {
      await PublicationDataService.update(req.params.id, req.body);

      console.log({success: true});

      res.send({success: true});
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send({success: false, error: e.message});
    }
  });

  router.delete(`/:id`, async (req, res) => {
    try {
      await PublicationDataService.drop(req.params.id);

      res.send({success: true});
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send({success: false, error: e.message});
    }
  });
};
