const express = require("express");
const router = express.Router();

const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas/users");
const ctrl = require("../../controllers/auth/auth");

const { validateBody, authentication, upload } = require("../../middlewares");

router.post(
  "/register",
  upload.single("avatar"),
  validateBody(registerSchema),

  ctrl.register
);
router.post("/login", validateBody(loginSchema), ctrl.login);
router.get("/current", authentication, ctrl.getCurrent);
router.post("/logout", authentication, ctrl.logout);
router.patch(
  "/",
  authentication,
  validateBody(subscriptionSchema),
  ctrl.updateSubscription
);
router.patch(
  "/avatars",
  authentication,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
