const swag = require('../models/swag')

module.exports = {
    search: (req, res, next) => {
        const { category } = req.query
        const filteredSwag =  swag.filter(item => item.category === category);
    //     if(filteredSwag === []){
    //         res.status(200).send(swag)
    //     } else {
    //         res.status(200).send(filteredSwag)
    //     }
        if (!category) {
            res.status(200).send(swag);
        } else {
            res.status(200).send(filteredSwag)
        }
    }
}