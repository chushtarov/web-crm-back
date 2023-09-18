const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.userController = {
    getAllUser: async (req, res)=> {
        const users = await User.find()
        res.json(users)
    },

    patchResult: async (req, res) => {
    const result = await User.findByIdAndUpdate(req.user.id, {
        $inc: {result: 1}
    },{new:true})
   res.json(result)
    },

    registerUser: async (req, res) => {
        const {login, password, result} = req.body;
        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))
        const user = await User.create({login, password: hash})
        res.json(user)
    },
    findOneUser: async(req,res) => {
        const data = await User.findById(req.user.id)
        res.json(data)
    },
    login: async (req, res) => {
        const {login, password} = req.body

        const candidate = await User.findOne({login})
        if(!candidate){
            return res.status(401).json({error: 'неправильный логин или пароль'})
        }

        const valid = await bcrypt.compare(password, candidate.password)
        if(!valid){
            return res.status(401).json({error: 'неправильный логин или пароль'})
        }

        const payload = {
            id: candidate._id,
            login: candidate.login
        }

        const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: '240h'
        })
        return res.json({token})
    }
}