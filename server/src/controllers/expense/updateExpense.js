import prisma from "../../config/prisma.js";

export async function updateExpense(req, res)
{
	try
	{
		const {category_id, id: expense_id} = req.params;
		const {title, amount} = req.body;
		const existingExpense = await prisma.expenses.findFirst({
			where: {
				id: expense_id,
				category_id: category_id,
				categories: {
					user_id: req.user.id,
				},
			},
		});

		if (!existingExpense)
		{
			return res.status(404).json({
				success: false,
				message: "EXPENSE_NOT_FOUND",
				data: null,
			});
		}

		const updatedExpense = await prisma.expenses.update({
			where: {
				id: expense_id,
			},
			data: {
				...(title && {title}),
				...(amount !== undefined && {
					amount: Number(amount),
				}),
			},
		});

		return res.status(200).json({
			success: true,
			message: "EXPENSE_UPDATE_SUCCESS",
			data: updatedExpense,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "EXPENSE_UPDATE_FAIL",
			data: null,
		});
	}
};