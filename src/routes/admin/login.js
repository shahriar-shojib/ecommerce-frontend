import api from '../../modules/api';

export async function post(req, res) {
	try {
		const { username, password } = req.body;
		const data = await api.adminLogin(username, password);
		req.session.token = data;
		console.log(data);
		res.end(JSON.stringify({ token: data }));
	} catch (error) {
		res.end(JSON.stringify({ message: error.message }));
	}
}
