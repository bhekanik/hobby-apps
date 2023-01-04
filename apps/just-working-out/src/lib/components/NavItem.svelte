<script lang="ts">
	export let href: string;
</script>

<li class="text-custom-green hover:text-custom-red h-full py-0 md:py-4 px-1 md:px-4">
	<a {href}><slot /></a>
</li>
