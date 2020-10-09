import api from '../../modules/api';
export async function get(req, res) {
	const token = req.session.token;
	const data = await api.products();
	res.end(JSON.stringify(data));
}
export async function post(req, res) {
	const token = req.session.token;
	const data = await api.createProduct(req.body, token);
	res.end(JSON.stringify(data));
}
