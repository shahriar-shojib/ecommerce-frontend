import api from '../../modules/api';
export async function get(req, res) {
	const token = req.session.token;
	const data = await api.promos(token);
	res.end(JSON.stringify(data));
}
