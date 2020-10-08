<script context="module">
	export async function preload() {
		const data = await this.fetch('/products').then(res => res.json());
		return { data };
	}
</script>

<script>
	import SingleProduct from './_components/SingleProduct.svelte';
	export let data;
</script>

<div class="container">
	<div class="row">
		{#each data as product (product._id)}
			<SingleProduct {...product} />
		{/each}
	</div>
</div>
