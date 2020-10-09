<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let order;
	function handleCancel() {
		dispatch('cancel', order._id);
	}
	function handleConfirm() {
		dispatch('confirm', order._id);
	}
</script>

<div class="card mb-2 shadow-sm">
	<div class="card-body">
		<div class="row">
			<div class="col-md-10">
				<div class="d-flex justify-content-between align-items-center">
					<h5>{order._id}</h5>
					<h6>{order.username}</h6>
					<div class="d-flex">
						{#each order.items as item}
							<div class="mr-2 p-2 border shadow-sm">
								<p class="mb-0">{item.item_info.name}</p>
								<p class="mb-0">Price : {item.item_info.price}</p>
							</div>
						{/each}
					</div>
					<div>
						<p>{order.amount}</p>
						{#if order.promo_code}
							<p>Promo Code: {order.promo_code}</p>
						{/if}
					</div>
					<div class="d-flex flex-column align-items-center">
						<button class="btn btn-warning mb-2" on:click={handleConfirm}>Confirm</button>
						<button class="btn btn-outline-danger mb-2" on:click={handleCancel}>Cancel</button>
					</div>
				</div>
			</div>
			<div class="col-md2">
				<div class="d-flex justify-content-center align-items-center">
					<h5 class="text-success">{order.status.toUpperCase()}</h5>
				</div>
			</div>
		</div>
	</div>
</div>
