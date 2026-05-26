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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="28"
						height="28"
						fill="#eaefef"
						viewBox="0 0 256 256"
					>
						<path d="M216,64H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,56V184a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm0,128H56a8,8,0,0,1-8-8V78.63A23.84,23.84,0,0,0,56,80H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,132Z"></path>
					</svg>
					Expense Tracker
				</Link>

				<div className="navbar-links">

					<button onClick={() => setShowModal(true)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							fill="#eaefef"
							viewBox="0 0 256 256"
						>
							<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
						</svg>
					</button>

					<button onClick={handleLogout}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							fill="#eaefef"
							viewBox="0 0 256 256"
						>
							<path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path>
						</svg>
					</button>
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