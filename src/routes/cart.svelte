<script>
	import { cart } from '../modules/app';
	import SingleCart from './_components/SingleCartProduct.svelte';
	import Checkout from './_components/Checkout.svelte';
</script>

<svelte:head>
	<title>Cart [{$cart.length}]</title>
</svelte:head>
<div class="container">
	<section class="mt-5 mb-4">
		<div class="row">
			<div class="col-lg-7 p-5 text-center shadow-sm">
				<div class="card mb-4">
					<div class="card-body">
						{#if $cart.length !== 0}
							{#each $cart as item}
								<SingleCart {...item} />
								<hr class="mb-2" />
							{/each}
						{:else}
							<h1>No items in cart</h1>
						{/if}
					</div>
				</div>
			</div>
			<div class="col-lg-5 p-5 shadow-sm">
				<Checkout />
			</div>
		</div>
	</section>
</div>
