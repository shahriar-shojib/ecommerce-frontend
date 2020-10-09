import api from '../../modules/api';
export async function post(req, res) {
	const token = req.session.token;
	const data = await api.deletePromo(req.body.id, token);
	res.end(JSON.stringify(data));
}
