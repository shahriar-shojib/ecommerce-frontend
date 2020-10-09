<script>
	export let segment;
	import { adminLoggedIn } from '../../modules/app';
	import Login from './_components/Login.svelte';
	import { stores } from '@sapper/app';
	const { session } = stores();
	if ($session.token) {
		adminLoggedIn.set(true);
	}
</script>

{#if $adminLoggedIn}
	<div class="p-5">
		<div class="row">
			<div class="col-2">
				<div class="nav flex-column nav-pills">
					<a href="/admin/orders" class="nav-link" class:active={segment === 'undefined' || segment === 'orders'}>Orders</a>
					<a href="/admin/products" class="nav-link" class:active={segment === 'products' || segment === ''}>Products</a>
					<a href="/admin/promos" class="nav-link" class:active={segment === 'promos' || segment === ''}>Promos</a>
					<a href="/admin/admins" class="nav-link" class:active={segment === 'admins' || segment === ''}>Admins</a>
				</div>
			</div>
			<div class="col-10">
				<slot />
			</div>
		</div>
	</div>
{:else}
	<Login />
{/if}
