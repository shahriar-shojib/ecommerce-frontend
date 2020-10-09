<script>
	import { cart } from '../../modules/app';
	export let name, price, discount_percent, product_image, _id, shipping_charge, __v;
	function handleClick() {
		cart.update(v => {
			let existingIndex = v.findIndex(e => e._id === _id);
			if (existingIndex !== -1) {
				if (v[existingIndex].quantity === undefined) v[existingIndex].quantity = 1;
				v[existingIndex] = { ...v[existingIndex], quantity: v[existingIndex].quantity + 1 };
				return v;
			} else {
				return [
					...v,
					{
						_id,
						product_image,
						price,
						discount_percent,
						name,
						shipping_charge,
						__v,
						quantity: 1,
					},
				];
			}
		});
	}
</script>

<div class="col-md-3">
	<div class="card shadow mb-5">
		<div class="hover_content"><button class="btn btn-warning" on:click={handleClick}>Add to Cart</button></div>
		<div class="cardbody">
			<img src={product_image} class="card-img-top mt-2" alt="..." />
			<div class="card-body">
				<h5 class="card-title">{name}</h5>
				<p class="card-text d-flex justify-content-between">BDT {price} <span class="badge badge-secondary">-{discount_percent}%</span></p>
			</div>
		</div>
	</div>
</div>

<style>
	button {
		background-color: #fff700;
		border: none;
		border-radius: 20px;
	}
	.hover_content {
		visibility: hidden;
		opacity: 0;
		display: flex;
		transform: translate(25%, 0);
		align-items: center;
		height: 100%;
		width: 100%;
		position: absolute;
	}
	button {
		place-items: center;
	}

	.card:hover .hover_content {
		opacity: 1;
		visibility: visible;
		-webkit-transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
		transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
	}
	.card:hover .cardbody {
		opacity: 0;
		visibility: hidden;
	}
	.cardbody {
		-webkit-transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
		transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
	}

	img {
		object-fit: none;
		object-position: top;
		height: 200px;
	}
	.card {
		width: 100%;
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
