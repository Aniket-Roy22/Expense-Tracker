import express from "express";

import {authenticateAccessToken} from "../middleware/authenticateTokens.js";

import {createExpense} from "../controllers/expense/createExpense.js";
import {getExpenses, getExpenseById} from "../controllers/expense/getExpense.js";
import {updateExpense} from "../controllers/expense/updateExpense.js";
import {deleteExpense} from "../controllers/expense/deleteExpense.js";

const router = express.Router({
	mergeParams: true,
});

router.use(authenticateAccessToken);

router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;