const { userController } = require("../controllers/user.controller");
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = Router();

router.get("/api/users", userController.getAllUser);
router.post("/api/users", userController.registerUser);
router.post("/api/login", userController.login);
router.patch("/userResult", authMiddleware, userController.patchResult);
router.get("/oneUser", authMiddleware, userController.findOneUser);

router.post("/admin/create", authMiddleware, userController.createAdminAccount);

module.exports = router;
