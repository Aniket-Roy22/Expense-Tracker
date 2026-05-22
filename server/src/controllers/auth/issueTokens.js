import {
	generateAccessToken,
	generateRefreshToken,
} from "../../utils/generateToken.js";

export function issueTokens(req, res)
{
	const payload = req.user;
	const accessToken = generateAccessToken(payload);
	const refreshToken = generateRefreshToken(payload);

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: false,
		path: "/auth",
		sameSite: "lax",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
	res.status(200).json({
		accessToken: accessToken,
		user: payload,
	});
}