import api from '../modules/api';
export async function post(req, res) {
	const token = req.session.userToken;
	const { items, promo_code } = req.body;
	const response = await api.createOrder(token, items, promo_code);
	res.end(JSON.stringify(response));
}
