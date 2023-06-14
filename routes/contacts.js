const routes = require('express').Router();
const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.getAllData);
routes.get('/:id', contactsController.getSingleData);

module.exports = routes;