import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {logoutUser} from "../api/auth.js";
import {createCategory} from "../api/categories.js";
import {useAuth} from "../context/AuthContext.jsx";
import "../styles/navbar.css";

function Navbar()
{
	const navigate = useNavigate();
	const {setUser} = useAuth();
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		limitAmount: "",
	});

	async function handleLogout()
	{
		try
		{
			await logoutUser();
		}
		catch (error)
		{
			console.log(error);
		}
		finally
		{
			localStorage.removeItem("accessToken");
			setUser(null);
			navigate("/login");
		}
	}

	function handleChange(event)
	{
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	async function handleCreateCategory(event)
	{
		event.preventDefault();

		try
		{
			await createCategory(formData);

			setFormData({
				name: "",
				limitAmount: "",
			});

			setShowModal(false);
			window.location.reload();
		}
		catch (error)
		{
			console.log(error);
		}
	}

	return (
		<>
			<nav className="navbar">
				<Link to="/dashboard" className="navbar-logo">
					Expense Tracker
				</Link>

				<div className="navbar-links">
					<Link to="/dashboard">Dashboard</Link>

					<button onClick={() => setShowModal(true)}>
						Create Category
					</button>

					<button onClick={handleLogout}>Logout</button>
				</div>
			</nav>

			{showModal && (
				<div className="modal-overlay">
					<div className="modal">
						<h2>Create Category</h2>

						<form onSubmit={handleCreateCategory}>
							<input
								type="text"
								name="name"
								placeholder="Category Name"
								value={formData.name}
								onChange={handleChange}
								required
							/>

							<input
								type="number"
								name="limitAmount"
								placeholder="Limit Amount"
								value={formData.limitAmount}
								onChange={handleChange}
								required
							/>

							<div className="modal-buttons">
								<button type="submit">Create</button>

								<button
									type="button"
									onClick={() => setShowModal(false)}
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

export default Navbar;