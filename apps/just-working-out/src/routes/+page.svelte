<script lang="ts">
	import ChartRangeSelector from '$lib/components/ChartRangeSelector.svelte';
	import TrendChart from '$lib/components/TrendChart.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: weight = data.weight.map((w) => ({ ...w, date: w.date })) ?? [];
	$: sleep = data.sleep.map((w) => ({ ...w, date: w.date })) ?? [];
</script>

<div class="w-full px-8 flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
	<h1 class="text-lg md:text-2xl font-bold">Dashboard</h1>
	<ChartRangeSelector />
</div>

<div class="flex flex-col gap-4 md:gap-14">
	<TrendChart data={weight} title="Weight Trends" />
	<TrendChart data={sleep} title="Sleep Trends" />
</div>
