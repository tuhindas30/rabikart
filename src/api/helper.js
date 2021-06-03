import axios from "axios";

const BASE_URL = "https://rabikart.tuhindas5.repl.co";

// const handleAPIResponse = async (resp) => {
// 	const response = await resp;
// 	if (response.status === false) {
// 		throw new Error(response.message);
// 	}
// 	return response;
// };
const handleAPIResponse = async (route) => {
	try {
		const response = await axios.get(`${BASE_URL}/${route}`);
		return response;
	} catch (error) {
		console.error(error.response.data);
	}
};
export { BASE_URL, handleAPIResponse };
