import express from 'express';
const router = express.Router();

const ENDPOINT: string = "users";
const controller = require(`../controllers/${ENDPOINT}`);


router.get("/refresh_token", controller.refreshToken)
router.post(`/register`, controller.register)
router.post(`/login`, controller.login)
router.post(`/social-signin`, controller.socialSignIn)
router.put('/auth/change-password', controller.changePassword)
router.put('/auth/change-username', controller.changeUsername)
router.get("/auth/watchlist/:cryptoId", controller.addToWatchlist);
router.delete("/auth/watchlist/:cryptoId", controller.removeFromWatchlist);
router.get("/auth/watchlist", controller.getWatchlist);

router.get(`/${ENDPOINT}/`, controller.getUsers);
module.exports = router;