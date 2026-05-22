import express from "express";
import {authenticateRefreshToken} from "../middleware/authenticateTokens.js";
import {localAuth} from "../middleware/localAuth.js";
import {registerUser} from "../middleware/registerUser.js";
import {issueTokens} from "../controllers/auth/issueTokens.js";
import {regenAccessToken} from "../controllers/auth/regenAccessToken.js";
import {logoutUser} from "../controllers/auth/logoutUser.js";

const router = express.Router();

router.post("/login", localAuth, issueTokens);
router.post("/register", registerUser, issueTokens);
router.post("/token", authenticateRefreshToken, regenAccessToken);
router.post("/logout", authenticateRefreshToken, logoutUser);

export default router;