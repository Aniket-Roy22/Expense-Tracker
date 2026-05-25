import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../api/auth.js";
import {useAuth} from "../context/AuthContext.jsx";
import "../styles/form.css";

function Register()
{
	const navigate = useNavigate();
	const {setUser} = useAuth();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	function handleChange(event)
	{
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	async function handleSubmit(event)
	{
		event.preventDefault();
		setLoading(true);
		setError("");

		try
		{
			const response = await registerUser(formData);
			const {accessToken, user} = response.data;

			localStorage.setItem("accessToken", accessToken);
			setUser(user);

			navigate("/dashboard");
		}
		catch (error)
		{
			setError(error.response?.data?.message || "Registration failed");
		}
		finally
		{
			setLoading(false);
		}
	}

	return (
		<div className="form-page">
			<form className="form-container" onSubmit={handleSubmit}>
				<h1>Register</h1>

				<input
					type="text"
					name="username"
					placeholder="Username"
					value={formData.username}
					onChange={handleChange}
					required
				/>

				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>

				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>

				{error && <p className="error-text">{error}</p>}

				<button type="submit" disabled={loading}>
					{loading ? "Creating account..." : "Register"}
				</button>

				<p>
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</form>
		</div>
	);
}

export default Register;