const routes = require('express').Router();
const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.getAllData);
routes.get('/:id', contactsController.getSingleData);
routes.get('/:id', contactsController.createContact);
routes.get('/:id', contactsController.updateContact);
routes.get('/:id', contactsController.deleteContact);

module.exports = routes;