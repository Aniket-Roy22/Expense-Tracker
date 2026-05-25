import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {updateCategory, deleteCategory} from "../api/categories.js";
import "../styles/categorycard.css";

function CategoryCard({category})
{
	const navigate = useNavigate();
	const percentage = (category.utilized / category.limitAmount) * 100;
	const [showEdit, setShowEdit] = useState(false);
	const [formData, setFormData] = useState({
		name: category.name,
		limit_amount: category.limitAmount,
	});

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
			await updateCategory(category.id, formData);
			window.location.reload();
		}
		catch (error)
		{
			console.log(error);
		}
	}

	async function handleDelete(event)
	{
		event.stopPropagation();

		try
		{
			await deleteCategory(category.id);
			window.location.reload();
		}
		catch (error)
		{
			console.log(error);
		}
	}

	return (
		<>
			<div
				className="category-card"
				onClick={() => navigate(`/categories/${category.id}`)}
			>
				<h2>{category.name}</h2>

				<p>Limit: ₹{category.limitAmount}</p>

				<p>Used: ₹{category.utilized}</p>

				<p>Remaining: ₹{category.remaining}</p>

				<div className="progress-bar">
					<div
						className="progress-fill"
						style={{
							width: `${percentage}%`,
						}}
					/>
				</div>

				<div className="category-buttons">
					<button
						onClick={(event) => {
							event.stopPropagation();
							setShowEdit(true);
						}}
					>
						Edit
					</button>

					<button onClick={handleDelete}>Delete</button>
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
		</>
	);
}

export default CategoryCard;