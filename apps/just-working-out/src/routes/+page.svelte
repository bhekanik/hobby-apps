<script lang="ts">
	import TrendChart from '$lib/components/TrendChart.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: weight = data.weight.map((w) => ({ ...w, date: w.date })) ?? [];
	$: sleep = data.sleep.map((w) => ({ ...w, date: w.date })) ?? [];
</script>

<div class="flex flex-col justify-between items-center mb-4">
	<h1 class="text-3xl font-bold">Home</h1>
</div>

<div class="flex flex-col gap-20">
	<TrendChart data={weight} title="Weight Trends" />
	<TrendChart data={sleep} title="Sleep Trends" />
</div>
