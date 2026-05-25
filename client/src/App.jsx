import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Category from "./pages/Category.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./App.css";

function App()
{
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Navigate to="/dashboard" replace />}
					/>

					<Route path="/login" element={<Login />} />

					<Route path="/register" element={<Register />} />

					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/categories/:id"
						element={
							<ProtectedRoute>
								<Category />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;