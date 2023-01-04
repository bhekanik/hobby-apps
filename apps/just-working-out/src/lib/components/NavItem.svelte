<script lang="ts">
	export let href: string;
</script>

<li class="text-custom-green hover:text-custom-red h-full p-4">
	<a {href}><slot /></a>
</li>
