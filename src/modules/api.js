class API {
	constructor(baseURL) {
		this.baseURL = baseURL;
		this.fetch = require('node-fetch');
	}

	//User methods
	async checkPromo(promoCode) {
		return await this.get(`/promo/${promoCode}`);
	}
	async products() {
		return await this.get('/products');
	}

	async createOrder(token, items, promo_code) {
		return await this.post('/user/order/create', token, { items, promo_code });
	}

	async userSignup(username, password) {
		const { success, token, message } = await this.post('/user/create', '', { username, password });
		if (success) {
			return token;
		} else {
			throw new Error(message);
		}
	}

	async userLogin(username, password) {
		const { success, token, message } = await this.post('/user/login', '', { username, password });
		if (success) {
			return token;
		} else {
			throw new Error(message);
		}
	}

	//admin methods
	async createProduct(payload, token) {
		return await this.adminPost('/admin/products/create', token, payload);
	}
	async createAdmin(username, password, token) {
		return await this.adminPost('/admin/create', token, { username, password });
	}
	async createPromo(payload, token) {
		return await this.adminPost('/admin/promos/create', token, payload);
	}

	async deletePromo(id, token) {
		return await this.adminGet('/admin/promos/delete/' + id, token);
	}

	async promos(token) {
		return await this.adminGet('/admin/promos', token);
	}

	async updateOrder(id, status, token) {
		return await this.adminPost(`/admin/orders/update`, token, { id, status });
	}

	async adminOrders(token) {
		return await this.adminGet('/admin/orders', token);
	}

	async adminLogin(username, password) {
		const { success, token } = await this.post('/admin/login', '', { username, password });
		if (success) {
			return token;
		} else {
			throw new Error('Invalid Username or Password');
		}
	}

	//admin helpers
	async adminGet(path, token = 'none') {
		return await this.fetch(`${this.baseURL}${path}`, {
			headers: { session: token },
		}).then(res => res.json());
	}
	async adminPost(path, token, payload) {
		return await this.fetch(`${this.baseURL}${path}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				session: token,
			},
			body: JSON.stringify(payload),
		}).then(res => res.json());
	}

	//user helpers
	async get(path, token = 'none') {
		return await this.fetch(`${this.baseURL}${path}`, {
			headers: { token },
		}).then(res => res.json());
	}

	async post(path, token, payload) {
		return await this.fetch(`${this.baseURL}${path}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				token,
			},
			body: JSON.stringify(payload),
		}).then(res => res.json());
	}
}
const api = new API('https://api.shahriarshojib.com');
export default api;
