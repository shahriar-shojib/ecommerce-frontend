import api from '../../modules/api';
export async function get(req, res) {
	try {
		const token = req.session.token;
		const data = await api.adminOrders(token);
		res.end(JSON.stringify(data));
	} catch (error) {
		res.end(error.message);
	}
}
