<script context="module">
	export async function preload(_page, session) {
		const data = await this.fetch('/admin/orders').then(res => res.json());
		return { data };
	}
</script>

<script>
	import Login from './_components/Login.svelte';
	import Dashboard from './_components/Dashboard.svelte';
	import { adminLoggedIn } from '../../modules/app';
	import { stores } from '@sapper/app';
	const { session } = stores();
	if ($session.token) {
		adminLoggedIn.set(true);
	}
	export let data;
</script>

<svelte:head>
	<title>Admin Panel</title>
</svelte:head>
{#if $adminLoggedIn}
	<Dashboard {data} />
{:else}
	<Login />
{/if}
