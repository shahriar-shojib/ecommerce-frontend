<script>
	import { userLoggedIn } from '../modules/app';
	import Login from './_components/Login.svelte';
	import { stores } from '@sapper/app';
	const { session } = stores();
	if ($session.userToken) {
		console.log($session);
		userLoggedIn.set(true);
	}
</script>

<svelte:head>
	<title>User Login</title>
</svelte:head>
{#if $userLoggedIn}
	<div class="container">
		<div class="row">
			<div class="col-lg-12 text-center">
				<h1>Successfully Logged in</h1>
				<a class="btn btn-primary" href="/cart" rel="prefetch"> Go back to cart</a>
			</div>
		</div>
	</div>
{:else}
	<div class="container">
		<div class="row">
			<div class="col-md-12 text-center">
				<h1>Signup</h1>
				<Login />
			</div>
		</div>
	</div>
{/if}
