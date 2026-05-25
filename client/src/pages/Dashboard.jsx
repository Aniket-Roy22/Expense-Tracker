import {useEffect, useState} from "react";
import {getAllCategories} from "../api/categories.js";
import Navbar from "../components/Navbar.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import "../styles/dashboard.css";

function Dashboard()
{
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	async function fetchCategories()
	{
		try
		{
			const response = await getAllCategories();
			setCategories(response.data.data);
		}
		catch (error)
		{
			console.log(error);
		}
	}

	return (
		<div>
			<Navbar />

			<div className="dashboard">
				{categories.map((category) => (
					<CategoryCard key={category.id} category={category} />
				))}
			</div>
		</div>
	);
}

export default Dashboard;