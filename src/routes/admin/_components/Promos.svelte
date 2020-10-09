<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let promo;
	const { used_count, code, max_uses, expires, description, discount_percent, _id } = promo;
	function handleDelete() {
		dispatch('delete', _id);
	}
</script>

<div class="card shadow-sm mb-3">
	<div class="card-body p-3">
		<h5 class="card-title">{code} <span class="badge badge-primary">{discount_percent}% off</span></h5>
		<h6 class="card-subtitle">Valid Till {expires}</h6>
		<hr class="mb-2" />
		<p><strong>Description: </strong>{description}</p>
		<p><strong>Total Used: </strong>{used_count}</p>
		<p><strong>Max Usage: </strong> {max_uses}</p>
		<button class="btn btn-danger" on:click={handleDelete}>Delete</button>
	</div>
</div>
