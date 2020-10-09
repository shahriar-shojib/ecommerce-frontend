<script>
	import { cart, userLoggedIn } from '../../modules/app';
	import { goto } from '@sapper/app';
	let promoCode;
	let error;
	async function handlePromo() {
		const { success, data, message } = await fetch('/checkpromo', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ promoCode }),
		}).then(res => res.json());
		if (success) {
			error = null;
			promoDiscount = data.discount_percent / 100;
		} else {
			error = message;
		}
	}
	let info;
	let promoDiscount;
	$: finalDiscount = promoDiscount ? info.finalTotal * promoDiscount : null;

	cart.subscribe(v => {
		if (v.length !== 0) {
			let total = 0;
			let shipping = 0;
			let totalDiscount = 0;
			let finalTotal = 0;
			v.forEach(e => {
				let currentTotal = e.price * e.quantity;
				total += currentTotal;
				shipping += e.shipping_charge;

				let discountPerItem = (e.discount_percent / 100) * e.price;
				let totalDiscountAmount = e.quantity * discountPerItem;
				let currentTotalAfterDiscount = currentTotal - totalDiscountAmount;

				totalDiscount += totalDiscountAmount;
				finalTotal += currentTotalAfterDiscount + e.shipping_charge;
			});
			info = { total, shipping, totalDiscount, finalTotal };
		}
	});
	async function placeOrder() {
		await fetch('/placeOrder', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				items: [...$cart.map(e => ({ product_id: e._id, quantity: e.quantity }))],
				promo_code: promoCode || null,
			}),
		})
			.then(res => res.json())
			.then(() => {
				alert('Order placed');
				$cart = [];
			});
	}
</script>

<div class="card mb-4">
	<div class="card-body">
		<h3>Order Summary</h3>
		<hr class="mb-2" />
		{#if $cart.length !== 0}
			<p>Total Items {$cart.length}</p>
			<p>Total Amount {info.total}</p>
			<p>Total Shipping {info.shipping}</p>
			<p>Total Discount {info.totalDiscount}</p>
			{#if promoDiscount}
				<p>Subtotal: {info.finalTotal - finalDiscount} <span class="badge badge-success">-{promoDiscount * 100}%</span></p>
			{:else}
				<p>Subtotal: {info.finalTotal}</p>
			{/if}

			<form class="form-inline" on:submit|preventDefault={handlePromo}>
				<input type="text" class="form-control mb-2 mr-sm-2 w-30" placeholder="Promo Code" id="code" bind:value={promoCode} required />
				<button type="submit" class="btn btn-success mb-2">Apply</button>
				{#if error}
					<p class="text-danger">{error}</p>
				{/if}
			</form>

			{#if $userLoggedIn}
				<button class="btn btn-outline-warning shadow-sm" on:click={placeOrder}> Checkout</button>
			{:else}<button class="btn btn-outline-warning shadow-sm" on:click={() => goto('/login')}>Signup</button>{/if}
		{/if}
	</div>
</div>
