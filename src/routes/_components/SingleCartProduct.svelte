<script>
	import { cart } from '../../modules/app';

	export let product_image, name, price, quantity, _id, shipping_charge, discount_percent;
	function increment() {
		cart.update(v => {
			const index = v.findIndex(e => e._id === _id);
			v[index].quantity += 1;
			return v;
		});
	}
	function decrement() {
		cart.update(v => {
			const index = v.findIndex(e => e._id === _id);
			v[index].quantity -= 1;
			return v;
		});
	}
	function remove() {
		cart.update(v => {
			return v.filter(e => e._id !== _id);
		});
	}
</script>

<div class="row mb-4">
	<div class="col-md-5 col-lg-3 col-xl-3">
		<div class="vrounded mb-3 mb-md-0"><img class="img-fluid w-100" src={product_image} alt="Sample" /></div>
	</div>
	<div class="col-md-7 col-lg-9 col-xl-9">
		<div>
			<div class="d-flex justify-content-between text-left">
				<div style="width: 80%">
					<h5>{name}</h5>
					<p class="mb-2 text-muted text-uppercase small">Color: blue</p>
					<p class="mb-3 text-muted text-uppercase small">Size: M</p>
				</div>
				<div>
					<div class="quantity-container mb-0 w-100">
						<button class="btn btn-warning" on:click={decrement}> - </button>
						<input class="quantity" value={quantity} type="text" />
						<button class="btn btn-warning" on:click={increment}> + </button>
					</div>
				</div>
			</div>
			<div class="d-flex justify-content-between align-items-center">
				<div><button class="btn btn-outline-danger shadow-sm" on:click={remove}>Remove</button></div>
				<p class="mb-0">Price: <strong>{price}</strong></p>
				<p class="mb-0">Shipping: <strong>{shipping_charge}</strong></p>
				<p class="mb-0">Discount: <strong>{discount_percent} %</strong></p>
			</div>
		</div>
	</div>
</div>

<style>
	.quantity-container {
		width: 200px !important;
	}
	.quantity-container button {
		width: 20px !important;
		text-align: center;
		padding: 1px 3px !important;
	}
	.quantity-container input {
		width: 40px !important;
		text-align: center;
		margin: 4px;
	}

	img {
		height: 150px;
		object-fit: none;
		object-position: top;
	}
</style>
