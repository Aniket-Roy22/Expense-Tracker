import prisma from "../../config/prisma.js";

export async function deleteExpense(req, res)
{
	try
	{
		const {category_id, id: expense_id} = req.params;
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

		await prisma.expenses.delete({
			where: {
				id: expense_id,
			},
		});

		return res.status(200).json({
			success: true,
			message: "EXPENSE_DELETE_SUCCESS",
			data: null,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "EXPENSE_DELETE_FAIL",
			data: null,
		});
	}
};