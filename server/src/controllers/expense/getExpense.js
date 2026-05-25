import prisma from "../../config/prisma.js";

export async function getExpenses(req, res)
{
	try
	{
		const {category_id} = req.params;
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

		const expenses = await prisma.expenses.findMany({
			where: {
				category_id: category_id,
			},
			orderBy: {
				created_at: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			message: "EXPENSE_FETCH_SUCCESS",
			data: expenses,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "EXPENSE_FETCH_FAIL",
			data: null,
		});
	}
};

export async function getExpenseById(req, res)
{
	try
	{
		const {category_id, id: expense_id} = req.params;
		const expense = await prisma.expenses.findFirst({
			where: {
				id: expense_id,
				category_id: category_id,
				categories: {
					user_id: req.user.id,
				},
			},
		});

		if (!expense)
		{
			return res.status(404).json({
				success: false,
				message: "EXPENSE_NOT_FOUND",
				data: null,
			});
		}

		return res.status(200).json({
			success: true,
			message: "EXPENSE_FETCH_SUCCESS",
			data: expense,
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "EXPENSE_FETCH_FAIL",
			data: null,
		});
	}
};