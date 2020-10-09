import api from '../modules/api';
export async function post(req, res) {
	try {
		const { username, password } = req.body;
		const data = await api.userSignup(username, password);
		req.session.userToken = data;
		res.end(JSON.stringify({ token: data }));
	} catch (error) {
		res.end(JSON.stringify({ message: error.message }));
	}
}
