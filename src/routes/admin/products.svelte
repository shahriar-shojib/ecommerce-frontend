<script context="module">
	export async function preload(_page, session) {
		const data = await this.fetch('/admin/products.json').then(res => res.json());
		return { data };
	}
</script>

<script>
	export let data;
	console.log(data);
</script>

<div class="container">
	<div class="col-md-12">
		{#each data as product (product._id)}
			<img src={product.product_image} alt="" />
			<h4>{product.name}</h4>
			<p>{product.price}Taka discount: {product.discount_percent} %</p>
		{/each}
	</div>
</div>
