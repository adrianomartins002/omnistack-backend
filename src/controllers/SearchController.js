const Dev = require('../models/dev')
const parseStringAsArray = require('../models/utils/parseStringAsArray')

module.exports = {
    async index(request, response){
        const {latitude, longitude, techs} = request.query
        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near: {
                    $geometry:{
                        type:'Point',
                        coordinates:[longitude, latitude]
                    },
                    $maxDistance:10000
                }
            }
        });

        return response.json({devs});
    },

    async update(request, response){
        const github_username = request.params.github_username
        const {latitude, longitude, techs, bio} = request.body
        
        const techsArray = parseStringAsArray(techs);
        
        const location = {
            type:'Point',
            coordinates: [longitude, latitude],
        }
        await Dev.update({github_username},{location, techs: techsArray, bio})
        const devBuscado = await Dev.findOne({github_username})
        

        response.json({devBuscado})
    },

    async destroy(request, response){
        const github_username = request.params.github_username
        await Dev.deleteOne({github_username}, function (err){
            if(err) return err
            else response.send("deletado com sucesso")
        })
    }
}