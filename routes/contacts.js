const routes = require('express').Router();
const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.getAllData);
routes.get('/:id', contactsController.getSingleData);
routes.post('/', contactsController.createContact);
routes.put('/:id', contactsController.updateContact);
routes.delete('/:id', contactsController.deleteContact);

module.exports = routes;