import api from '../../modules/api';
export async function get(req, res) {
	const token = req.session.token;
	const data = await api.promos(token);
	res.end(JSON.stringify(data));
}
export async function post(req, res) {
	const token = req.session.token;
	const data = await api.createPromo(req.body, token);
	res.end(JSON.stringify(data));
}
