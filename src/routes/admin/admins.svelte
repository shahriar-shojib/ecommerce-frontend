<script>
	let username, password;
	function handleSubmit() {
		fetch('/admin/createAdmin', {
			headers: {
				'content-type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ username, password }),
		})
			.then(res => res.json())
			.then(() => alert('Created'));
	}
</script>

<svelte:head>
	<title>Create Admin</title>
</svelte:head>

<div class="row">
	<div class="col-md-4  text-center">
		<h3 class="mb-4">Add an Admin</h3>
		<div class="card">
			<div class="card-body">
				<form on:submit|preventDefault={handleSubmit}>
					<label for="username">Username</label>
					<input type="text" class="form-control mb-3" bind:value={username} required />
					<label for="Password">Password</label>
					<input type="password" class="form-control mb-3" bind:value={password} required />
					<button type="submit" class="btn btn-primary">Create Admin</button>
				</form>
			</div>
		</div>
	</div>
</div>
