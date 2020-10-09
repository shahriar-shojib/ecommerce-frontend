<script>
	import OrderCard from './OrderCard.svelte';

	export let data;
	$: currentFilter = false;
	$: data2 = filter(currentFilter);

	function handleCancel(e) {
		fetch('/admin/orders', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ id: e.detail, status: 'cancel' }),
		})
			.then(res => res.json())
			.then(fetchData)
			.then(() => (data2 = filter(currentFilter)));
	}

	function handleConfirm(e) {
		fetch('/admin/orders', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ id: e.detail, status: 'confirm' }),
		})
			.then(res => res.json())
			.then(fetchData)
			.then(() => (data2 = filter(currentFilter)));
	}

	async function fetchData() {
		data = await fetch('/admin/orders').then(res => res.json());
	}

	function filter(type) {
		let data2;
		if (!type) data2 = data;
		if (type === 'cancel') {
			data2 = data.filter(e => e.status === 'cancel');
		}
		if (type === 'processing') {
			data2 = data.filter(e => e.status === 'processing');
		}
		if (type === 'confirm') {
			data2 = data.filter(e => e.status === 'confirm');
		}
		return data2;
	}
	function setFilter(value) {
		currentFilter = value;
	}
</script>

<div class="row">
	<div class="col-md-12">
		<div class="card shadow-sm mb-2">
			<div class="card-body">
				<div class="d-flex flex-column">
					<h1>Filter</h1>
					<div>
						<button class="btn btn-primary" on:click={() => setFilter('processing')}>Procesing</button>
						<button class="btn btn-danger" on:click={() => setFilter('cancel')}>Cancel</button>
						<button class="btn btn-success" on:click={() => setFilter('confirm')}>Confirm</button>
						<button class="btn btn-outline-danger" on:click={() => setFilter()}>Clear Filter</button>
					</div>
				</div>
			</div>
		</div>
		<div class="card mb-2 shadow-sm">
			<div class="card-body">
				<div class="row">
					<div class="col-md-10">
						<div class="d-flex justify-content-between align-items-center">
							<h5>Order ID</h5>
							<h5>Username</h5>
							<h5>items</h5>
							<h5>Total</h5>
							<h5>Actions</h5>
						</div>
					</div>
					<div class="col-md-2">
						<div class="d-flex justify-content-between align-items-center">
							<h5>Status</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
		{#if data2.length !== 0}
			{#each data2 as order (order._id)}
				<OrderCard {order} on:cancel={handleCancel} on:confirm={handleConfirm} />
			{/each}
		{:else}
			<h1>No orders matches filter</h1>
		{/if}
	</div>
</div>
