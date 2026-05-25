import {useState} from "react";
import {updateExpense, deleteExpense} from "../api/expenses";
import "../styles/expenseitem.css";

function ExpenseItem({expense, category_id, refreshCategory})
{
	const [showEdit, setShowEdit] = useState(false);
	const [formData, setFormData] = useState({
		title: expense.title,
		amount: expense.amount,
	});
	const formattedDate = new Date(expense.created_at).toLocaleDateString(
		"en-IN",
		{
			day: "2-digit",
			month: "short",
			year: "numeric",
		},
	);

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
			await updateExpense(category_id, expense.id, formData);
			setShowEdit(false);
			refreshCategory();
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
			await deleteExpense(category_id, expense.id);
			refreshCategory();
		}
		catch (error)
		{
			console.log(error);
		}
	}

	return (
		<>
			<div className="expense-item">
				<div className="expense-header">
					<h3>{expense.title}</h3>
					<p>₹{expense.amount}</p>
					<p className="expense-date">{formattedDate}</p>
				</div>

				<div className="expense-buttons">
					<button onClick={() => setShowEdit(true)}>Edit</button>

					<button onClick={handleDelete}>Delete</button>
				</div>
			</div>

			{showEdit && (
				<div className="modal-overlay">
					<div className="modal">
						<h2>Edit Expense</h2>

						<form onSubmit={handleUpdate}>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
							/>

							<input
								type="number"
								name="amount"
								value={formData.amount}
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
		</>
	);
}

export default ExpenseItem;