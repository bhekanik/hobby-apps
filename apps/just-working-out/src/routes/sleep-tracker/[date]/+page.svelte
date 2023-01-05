<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LogSleepFormFields from '$lib/components/LogSleepFormFields.svelte';
	import { config } from '$lib/config';
	import { add, format, sub } from 'date-fns';

	$: date = new Date($page.params.date);
</script>

<div class="flex justify-between w-full mb-4">
	<a
		class="flex-1 text-left"
		href={`/sleep-tracker/${format(sub(date, { days: 1 }), config.dateFormat)}`}>Previous Day</a
	>
	<a class="flex-1 text-center" href={`/sleep-tracker/${format(new Date(), config.dateFormat)}`}
		>{$page.params.date === format(new Date(), config.dateFormat) ? '' : 'Today'}</a
	>
	<a
		class="flex-1 text-right"
		href={`/sleep-tracker/${format(add(date, { days: 1 }), config.dateFormat)}`}>Next Day</a
	>
</div>

{#if $page.data.id}
	<div class="w-full flex flex-col items-center gap-4 p-8">
		<p class="text-3xl text-custom-blue">
			{$page.data.value} <span class="text-zinc-500">{$page.data.unit}</span>
		</p>
		<a
			class="text-xl p-4 text-custom-green hover:text-custom-red"
			href="/sleep-tracker/{$page.params.date}/edit">Edit</a
		>
	</div>
{:else}
	<h2 class="w-full text-2xl mt-4 mb-2 text-center">Log Sleep</h2>
	<p class="w-full text-center">
		Add your sleep hours for {format(new Date(), 'EEEE, d LLLL yyyy')}
	</p>
	<form method="post" class="w-full flex flex-col items-center gap-4 p-8" use:enhance>
		<input type="hidden" name="date" value={format(date, config.dateFormat)} />
		<LogSleepFormFields value={$page.data.previousDayHours ?? 8} />
	</form>
{/if}
