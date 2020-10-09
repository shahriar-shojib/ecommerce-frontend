import api from '../modules/api';
export async function post(req, res) {
	const promoCode = req.body.promoCode;
	const data = await api.checkPromo(promoCode);
	res.end(JSON.stringify(data));
}
