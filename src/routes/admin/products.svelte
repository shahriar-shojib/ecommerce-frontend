<script context="module">
	export async function preload() {
		const data = await this.fetch('/admin/products.json').then(res => res.json());
		return { data };
	}
</script>

<script>
	export let data;
	let name, price, discount_percent, shipping_charge, product_image;
	function handleNewProduct() {
		let obj = {
			name,
			price,
			discount_percent,
			shipping_charge,
			product_image,
		};
		fetch('/admin/products.json', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(obj),
		})
			.then(res => res.json())
			.then(() => {
				data = [obj, ...data];
			});
	}
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<div class="row">
	<div class="col-md-9">
		<div class="row">
			<div class="col-md-10">
				<div class="card shadow-sm p-2 w-50">
					<form on:submit|preventDefault={handleNewProduct}>
						<p class="mb-2">Name</p>
						<input type="text" class="form-control mb-2" bind:value={name} required />
						<p class="mb-2">price</p>
						<input type="text" class="form-control mb-2" bind:value={price} required />
						<p class="mb-2">discount_percent</p>
						<input type="text" class="form-control mb-2" bind:value={discount_percent} required />
						<p class="mb-2">shipping_charge</p>
						<input type="text" class="form-control mb-2" bind:value={shipping_charge} required />
						<p class="mb-2">product_image</p>
						<input type="text" class="form-control mb-2" bind:value={product_image} required />
						<button class="btn btn-primary">Create a new Product</button>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		{#each data as product (product._id)}
			<div class="card shadow-sm mb-4">
				<div class="d-flex flex-column align-content-center justify-content-between p-4">
					<img src={product.product_image} class="shadow-sm mb-2 rounded" alt="" />
					<h4>{product.name}</h4>
					<p>{product.price}</p>
					<p>Taka discount: {product.discount_percent} %</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	img {
		object-fit: none;
		height: 200px;
		object-position: top;
	}
</style>
