const {userController} = require('../controllers/user.controller')
const {Router} = require('express')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.get('/users', userController.getAllUser)
router.post('/users', userController.registerUser)
router.post('/login', userController.login)
router.patch('/userResult', authMiddleware, userController.patchResult) 
router.get('/oneUser', authMiddleware, userController.findOneUser)

module.exports = router;