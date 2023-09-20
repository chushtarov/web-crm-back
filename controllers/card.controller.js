const Card = require('../models/Card.model');
module.exports.cardController = {
    getCards: async (req, res) => {
        try {
            const data = await Card.find()
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    },

    createCard: async (req, res) => {
        try {
            const data = await Card.create({
                header: req.body.header,
                text: req.body.text,
                img: req.body.img,
            })
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    },
}