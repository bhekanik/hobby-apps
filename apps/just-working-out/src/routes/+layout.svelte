<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<div class="h-[100%] w-[100%] min-h-screen bg-zinc-900 text-white font-inter">
	<Header />
	<div class="p-8 overflow-auto">
		<slot />
	</div>
</div>
