<script>
	import { cart } from '../../modules/app';
	export let name, price, discount_percent, product_image, _id;
	function handleClick() {
		cart.update(v => {
			return [
				...v,
				{
					_id,
					product_image,
					price,
					discount_percent,
					name,
				},
			];
		});
	}
</script>

<div class="col-3">
	<div class="card">
		<img src={product_image} class="card-img-top mt-2" alt="..." />
		<div class="card-body">
			<h5 class="card-title">{name}</h5>
			<p class="card-text d-flex justify-content-between">BDT {price} <span class="badge badge-secondary">-{discount_percent}%</span></p>
			<button class="btn btn-warning" on:click={handleClick}>Add to Cart</button>
		</div>
	</div>
</div>

<style>
	img {
		object-fit: none;
		object-position: top;
		height: 200px;
	}
	.card {
		width: 100%;
		box-shadow: 5px 5px 7px 0px #8a8a8a26;
		border-radius: 10px;
		border: none;
	}
	.badge {
		color: #fff;
		padding: 0.5rem;
		font-size: 0.8rem;
		background-color: #ffc107;
	}
</style>
