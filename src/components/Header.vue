<script setup>
import Logo from "../assets/logo.svg";
</script>

<template>
	<header>
		<div class="logo-container">
			<div class="logo">
				<Logo class="logo-svg" />
			</div>
			<div class="logo-text">Company Logo</div>
		</div>
		<h1>Place the title here..</h1>
		<p>Example of subtitle...</p>
	</header>
</template>

<style lang="scss">
header {
	margin-top: 4rem;
	padding: 1.5rem 2rem;
	background: var(--lighter-dark);
	border-radius: 2rem;

	.logo-container {
		display: flex;
		gap: 0.75rem;
		color: #ddd;

		.logo {
			width: 24px;
			fill: #ddd;
		}

		.logo-text {
			font-weight: 600;
		}
	}

	p {
		color: #ddd;
	}
}
</style>
