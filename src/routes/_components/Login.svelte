<script>
	import { userLoggedIn } from '../../modules/app';
	import { stores } from '@sapper/app';
	const { session } = stores();

	let username;
	let password;

	const submit = async () => {
		const res = await fetch('/login.json', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		}).then(res => res.json());
		if (res.token) {
			$session.token = res.userToken;
			userLoggedIn.set(true);
		}
	};
</script>

<section class="login">
	<form class="form-signin" on:submit|preventDefault={submit}>
		<label for="inputEmail" class="sr-only">Username</label>
		<input type="text" id="inputEmail" class="form-control" placeholder="Username" required bind:value={username} />
		<label for="inputPassword" class="sr-only">Password</label>
		<input type="password" id="inputPassword" class="form-control" placeholder="Password" required bind:value={password} />
		<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	</form>
</section>

<style>
	.login {
		display: -ms-flexbox;
		display: -webkit-box;
		display: flex;
		-ms-flex-align: center;
		-ms-flex-pack: center;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		padding-top: 40px;
		padding-bottom: 40px;
	}

	.form-signin {
		width: 100%;
		max-width: 330px;
		padding: 15px;
		margin: 0 auto;
	}
	.form-signin .form-control {
		position: relative;
		box-sizing: border-box;
		height: auto;
		padding: 10px;
		font-size: 16px;
	}
	.form-signin .form-control:focus {
		z-index: 2;
	}
	.form-signin input[type='text'] {
		margin-bottom: -1px;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}
	.form-signin input[type='password'] {
		margin-bottom: 10px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
</style>
