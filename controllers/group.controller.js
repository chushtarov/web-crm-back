// const Group = require('../models/Group.model');
// module.exports.cardController = {
//     getGroup: async (req, res) => {
//         try {
//             const data = await Group.find().populate("user")
//             res.json(data)
//         } catch (error) {
//             res.json(error)
//         }
//     },

//     createGroup: async (req, res) => {
//         try {
//             const data = await Group.create({
//                 group: req.body.group,
//                 user: req.params.id,
        
//             })
//             res.json(data)
//         } catch (error) {
//             res.json(error)
//         }
//     },
// }