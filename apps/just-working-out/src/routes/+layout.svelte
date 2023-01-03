<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<div class="h-[100vh] w-[100vw] bg-zinc-900 text-white">
	<Header />
	<div class="p-8">
		<slot />
	</div>
</div>
