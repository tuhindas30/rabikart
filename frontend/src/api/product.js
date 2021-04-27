import axios from "axios";
import { BASE_URL, handleAPIResponse } from "./helper";

const url = `${BASE_URL}/products`;

const getAllProducts = async (source) => {
	try {
		const {
			data: { products },
		} = await axios.get(`${url}`, {
			cancelToken: source.token,
		});
		return products;
	} catch (error) {
		console.log(error);
	}
};

export { getAllProducts };
