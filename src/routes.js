const { Router } = require('express')
const routes = Router();


routes.post('/', (request, response)=>{
    return response.json({message:'Hello Omnistack'});
})

module.exports = routes;