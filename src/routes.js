const { Router } = require('express')
const routes = Router();
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

routes.get('/search', SearchController.index )
routes.put('/search/:github_username', SearchController.update )
routes.delete('/search/:github_username', SearchController.destroy )
module.exports = routes;