import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
	getCategoryById,
	updateCategory,
	deleteCategory,
	resetCategory,
} from "../api/categories.js";
import {createExpense} from "../api/expenses.js";
import Navbar from "../components/Navbar.jsx";
import ExpenseItem from "../components/ExpenseItem.jsx";
import "../styles/category.css";

function Category()
{
	const {id} = useParams();
	const [category, setCategory] = useState(null);
	const [showEdit, setShowEdit] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		limit_amount: "",
	});
	const [showExpenseModal, setShowExpenseModal] = useState(false);
	const [expenseData, setExpenseData] = useState({
		title: "",
		amount: "",
	});

	useEffect(() => {
		fetchCategory();
	}, []);

	async function fetchCategory()
	{
		try
		{
			const response = await getCategoryById(id);
			setCategory(response.data.data);
			setFormData({
				name: response.data.data.name,
				limit_amount: response.data.data.limitAmount,
			});
		}
		catch (error)
		{
			console.log(error);
		}
	}

	function handleChange(event)
	{
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	async function handleUpdate(event)
	{
		event.preventDefault();

		try
		{
			await updateCategory(id, formData);
			setShowEdit(false);
			fetchCategory();
		}
		catch (error)
		{
			console.log(error);
		}
	}

	async function handleDelete()
	{
		try
		{
			await deleteCategory(id);
			window.location.href = "/dashboard";
		}
		catch (error)
		{
			console.log(error);
		}
	}

	if (!category)
	{
		return <h1>Loading...</h1>;
	}

	function handleExpenseChange(event)
	{
		setExpenseData({
			...expenseData,
			[event.target.name]: event.target.value,
		});
	}

	async function handleCreateExpense(event)
	{
		event.preventDefault();

		try
		{
			await createExpense(id, expenseData);
			setExpenseData({
				title: "",
				amount: "",
			});
			setShowExpenseModal(false);
			fetchCategory();
		}
		catch (error)
		{
			console.log(error);
		}
	}

	async function handleReset()
	{
		try
		{
			await resetCategory(id);
			fetchCategory();
		}
		catch (error)
		{
			console.log(error);
		}
	}

	return (
		<div>
			<Navbar />

			<div className="category-page">
				<div className="category-header">
					<div>
						<h1>{category.name}</h1>

						<p>Limit: ₹{category.limitAmount}</p>

						<p>Used: ₹{category.utilized}</p>

						<p>Remaining: ₹{category.remaining}</p>
					</div>

					<div className="category-buttons">
						<button onClick={() => setShowEdit(true)}>Edit</button>

						<button onClick={handleDelete}>Delete</button>

						<button onClick={() => setShowExpenseModal(true)}>Add Expense</button>

						<button onClick={handleReset}>Reset</button>
					</div>
				</div>

				<div className="expense-list">
					{category.expenses.map((expense) => (
						<ExpenseItem
							key={expense.id}
							expense={expense}
							category_id={id}
							refreshCategory={fetchCategory}
						/>
					))}
				</div>
			</div>

			{showEdit && (
				<div className="modal-overlay">
					<div className="modal">
						<h2>Edit Category</h2>

						<form onSubmit={handleUpdate}>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>

							<input
								type="number"
								name="limit_amount"
								value={formData.limit_amount}
								onChange={handleChange}
								required
							/>

							<div className="modal-buttons">
								<button type="submit">Update</button>

								<button
									type="button"
									onClick={() => setShowEdit(false)}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{showExpenseModal && (
				<div className="modal-overlay">
					<div className="modal">
						<h2>Add Expense</h2>

						<form onSubmit={handleCreateExpense}>
							<input
								type="text"
								name="title"
								placeholder="Expense Title"
								value={expenseData.title}
								onChange={handleExpenseChange}
								required
							/>

							<input
								type="number"
								name="amount"
								placeholder="Amount"
								value={expenseData.amount}
								onChange={handleExpenseChange}
								required
							/>

							<div className="modal-buttons">
								<button type="submit">Create</button>

								<button
									type="button"
									onClick={() => setShowExpenseModal(false)}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default Category;