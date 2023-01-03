<script lang="ts">
	export let href: string;
</script>

<li class="hover:bg-zinc-700 h-full p-4"><a {href}><slot /></a></li>
