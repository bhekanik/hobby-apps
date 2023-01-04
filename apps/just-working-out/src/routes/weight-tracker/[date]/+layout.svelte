<script lang="ts">
	import Case from 'case';
	import { format } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col justify-between items-center">
	<h1 class="text-3xl font-bold">Weight Tracker</h1>
	<span class="text-zinc-500">{Case.upper(format(new Date(), 'EEEE d LLL'))}</span>
</div>

<slot weight={data} />
