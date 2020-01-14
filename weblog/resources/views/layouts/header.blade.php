<section class="hero is-primary is-medium">
	<!-- Hero header: will stick at the top -->
	<div class="hero-head">
		<nav class="navbar">
			<div class="container">
				<div id="navbarMenuHeroA" class="navbar-menu">
					<div class="navbar-end">
						<router-link to="/users/login" class="navbar-item">log in</router-link>
						<router-link to="/users/signup" class="navbar-item">sign up</router-link>
						<router-link to="/users/logout" class="navbar-item">log out</router-link>
						<router-link to="/users/profile" class="navbar-item">profile</router-link>
					</div>
				</div>
			</div>
		</nav>
	</div>

	<!-- Hero content: will be in the middle -->
	<div class="hero-body">
		<div class="container has-text-centered">
			<h1 class="title">
				Weblog
			</h1>
			<h2 class="subtitle">
				Posts
			</h2>
		</div>
	</div>

	<!-- Hero footer: will stick at the bottom -->
	<div class="hero-foot">
		@include ('layouts.nav')
	</div>
</section>