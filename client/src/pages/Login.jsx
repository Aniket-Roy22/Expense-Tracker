import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../api/auth.js";
import {useAuth} from "../context/AuthContext.jsx";
import "../styles/form.css";

function Login()
{
	const navigate = useNavigate();
	const {setUser} = useAuth();
	const [formData, setFormData] = useState({
		username: "",
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
		console.log("Login submitted");		

		try
		{
			const response = await loginUser(formData);
			const {accessToken, user} = response.data;

			localStorage.setItem("accessToken", accessToken);
			setUser(user);

			navigate("/dashboard");
		}
		catch (error)
		{
			setError(error.response?.data?.message || "Login failed");
		}
		finally
		{
			setLoading(false);
		}
	}

	return (
		<div className="form-page">
			<form className="form-container" onSubmit={handleSubmit}>
				<h1>Login</h1>

				<input
					type="text"
					name="username"
					placeholder="Username"
					value={formData.username}
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
					{loading ? "Logging in..." : "Login"}
				</button>

				<p>
					Don't have an account? <Link to="/register">Register</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;