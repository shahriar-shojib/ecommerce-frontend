<script context="module">
	export async function preload() {
		const data = await this.fetch('/admin/promos.json').then(res => res.json());
		return { data };
	}
</script>

<script>
	export let data;
	import Promos from './_components/Promos.svelte';
	let code, expires, max_uses, description, discount_percent;

	function handleNewPromo() {
		const obj = {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ code, expires, max_uses, description, discount_percent }),
		};
		fetch('/admin/promos.json', obj)
			.then(res => res.json())
			.then(promo => (data = [promo, ...data]));
	}

	function handleDelete(e) {
		const obj = {
			method: 'POSt',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ id: e.detail }),
		};
		fetch('/admin/deletePromo', obj)
			.then(res => res.json())
			.then(() => (data = data.filter(el => el._id !== e.detail)));
	}
</script>

<svelte:head>
	<title>Promos</title>
</svelte:head>
<div class="row">
	<div class="col-md-8">
		<div class="card shadow-sm p-5">
			<div class="card-body">
				<h5 class="card-title">Add a new Promo</h5>
				<hr class="mb-4" />
				<form on:submit|preventDefault={handleNewPromo}>
					<label for="code">Code</label>
					<input type="text" class="form-control" bind:value={code} />
					<label for="description">Description</label>
					<input type="text" class="form-control" bind:value={description} />
					<label for="expires">Expires</label>
					<input type="date" class="form-control" bind:value={expires} />
					<label for="max uses">Max uses</label>
					<input type="text" class="form-control" bind:value={max_uses} />
					<label for="discount-percent">Discount Percent</label>
					<input type="number" class="form-control mb-3" bind:value={discount_percent} />
					<button class="btn btn-primary" type="submit">Add</button>
				</form>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		{#each data as promo (promo._id)}
			<Promos {promo} on:delete={handleDelete} />
		{/each}
	</div>
</div>
