import api from '../../modules/api';
export async function post(req, res) {
	const token = req.session.token;
	const { username, password } = req.body;
	const response = await api.createAdmin(username, password, token);
	res.end(JSON.stringify(response));
}
