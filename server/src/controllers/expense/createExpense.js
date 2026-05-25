import prisma from "../../config/prisma.js";

export async function createExpense(req, res)
{
	try
	{
		const {category_id} = req.params;
		const {title, amount} = req.body;

		if (!title || amount === undefined)
		{
			return res.status(400).json({
				success: false,
				message: "MISSING_FIELDS",
				data: null,
			});
		}

		const category = await prisma.categories.findFirst({
			where: {
				id: category_id,
				user_id: req.user.id,
			},
		});

		if (!category)
		{
			return res.status(404).json({
				success: false,
				message: "CATEGORY_NOT_FOUND",
				data: null,
			});
		}

		const expense = await prisma.expenses.create({
			data: {
				title,
				amount: Number(amount),
				category_id: category_id,
			},
		});

		return res.status(201).json({
			success: true,
			message: "EXPENSE_CREATE_SUCCESS",
			data: expense,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "EXPENSE_CREATE_FAIL",
			data: null,
		});
	}
};