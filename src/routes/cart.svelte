<script>
	import { cart } from '../modules/app';
</script>

<div class="row">
	<div class="col-12 p-5 text-center">
		{#if $cart.length !== 0}
			{#each $cart as item}
				<h1>{item.name}</h1>
			{/each}
		{:else}
			<h1>No items in cart</h1>
		{/if}
	</div>
</div>
