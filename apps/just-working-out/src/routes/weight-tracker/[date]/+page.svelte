<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LogWeightFormFields from '$lib/components/LogWeightFormFields.svelte';
	import { format } from 'date-fns';
</script>

{#if Object.keys($page.data).length}
	<div class="w-full flex flex-col items-center gap-4 p-8">
		<p class="text-3xl">{$page.data.weight} <span class="text-zinc-500">{$page.data.unit}</span></p>
		<a
			class="text-xl p-4 text-custom-green hover:text-custom-red"
			href="/weight-tracker/{$page.params.date}/edit">Edit</a
		>
	</div>
{:else}
	<h2 class="w-full text-2xl mt-4 mb-2 text-center">Add Weight</h2>
	<p class="w-full text-center">
		Add your weight for {format(new Date(), 'EEEE, d LLLL yyyy')}
	</p>
	<form method="post" class="w-full flex flex-col items-center gap-4 p-8" use:enhance>
		<LogWeightFormFields />
	</form>
{/if}
