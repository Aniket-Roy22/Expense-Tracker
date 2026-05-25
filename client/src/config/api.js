import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("accessToken");

		if (accessToken)
		{
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 403 &&
			!originalRequest._retry &&
			originalRequest.url !== "/auth/token"
		) {
			originalRequest._retry = true;

			try {
				const res = await axios.post(
					"http://localhost:3000/auth/token",
					{},
					{
						withCredentials: true,
					},
				);

				const newAccessToken = res.data.accessToken;
				localStorage.setItem("accessToken", newAccessToken);
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return api(originalRequest);
			} catch (refreshError) {
				localStorage.removeItem("accessToken");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default api;