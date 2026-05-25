import {createContext, useContext, useEffect, useState} from "react";
import {getCurrentUser} from "../api/auth.js";

const AuthContext = createContext();

export function AuthProvider({children})
{
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkAuth();
	}, []);

	async function checkAuth()
	{
		try
		{
			const response = await getCurrentUser();
			const accessToken = response.data.accessToken;

			localStorage.setItem("accessToken", accessToken);
			setUser(response.data.user);
		}
		catch (error)
		{
			setUser(null);
		}
		finally
		{
			setLoading(false);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth()
{
	return useContext(AuthContext);
}
