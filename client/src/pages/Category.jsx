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
					<div className="category-buttons-single-page">
						<button onClick={() => setShowEdit(true)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 256 256"
							>
								<path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
							</svg>
						</button>

						<button onClick={handleDelete}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 256 256"
							>
								<path d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"></path>
							</svg>
						</button>

						<button onClick={handleReset}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 256 256"
							>
								<path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"></path>
							</svg>
						</button>

						<button onClick={() => setShowExpenseModal(true)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 256 256"
							>
								<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
							</svg>
						</button>
					</div>

					<div className="category-header-info">
						<h1>{category.name}</h1>

						<p>Limit: ₹{category.limitAmount}</p>

						<p>Used: ₹{category.utilized}</p>

						<p>Remaining: ₹{category.remaining}</p>
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