<script lang="ts">
	import { page } from '$app/stores';
	import Case from 'case';
	import { format } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;
	$: date = data.date ?? new Date($page.params.date);
</script>

<div class="flex flex-col justify-between items-center mb-4">
	<h1 class="text-3xl font-bold">Sleep Tracker</h1>
	<span class="text-zinc-500">{Case.upper(format(date, 'EEEE d LLL'))}</span>
</div>

<slot weight={data} />
