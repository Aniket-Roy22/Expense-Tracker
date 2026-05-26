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
				<div className="expense-details">
					<h3>{expense.title}</h3>
					<p>₹{expense.amount}</p>
					<p className="expense-date">{formattedDate}</p>
				</div>

				<div className="expense-buttons">
					<button onClick={() => setShowEdit(true)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 256 256"
						>
							<path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
						</svg>
					</button>

					<button onClick={handleDelete}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 256 256"
						>
							<path d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"></path>
						</svg>
					</button>
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