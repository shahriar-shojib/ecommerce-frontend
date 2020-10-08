<script context="module">
	export async function preload(_page, session) {
		const data = await this.fetch('/admin/promos.json').then(res => res.json());
		return { data };
	}
</script>

<script>
	export let data;
	console.log(data);
</script>

<div class="container">
	<div class="col-md-12">
		{#each data as promo (promo._id)}
			<h2>Code: {promo.code}</h2>
			<p>{promo.description}</p>
			<p>Discount: {promo.discount_percent}%</p>
			<p>Used By: {promo.used_count}</p>
			<p>Valid Until: {promo.expires}</p>
			<p>Max uses: {promo.max_uses}</p>
		{/each}
	</div>
</div>
