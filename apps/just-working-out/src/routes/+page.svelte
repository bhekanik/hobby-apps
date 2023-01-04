<script lang="ts">
	import type { Weight } from '$lib/xata';
	import * as d3 from 'd3';
	import { format, parseISO } from 'date-fns';
	import colors from 'tailwindcss/colors';
	import type { PageData } from './$types';

	let height: number;
	let width: number;

	export let data: PageData;
	const weight = data.records.map((w) => ({ ...w, date: parseISO(w.date as string) })) ?? [];

	let result: string | null = '';

	let margin = {
		top: 20,
		right: 20,
		bottom: 40,
		left: 40
	};

	let xScale: d3.ScaleTime<number, number>;
	let yScale: d3.ScaleLinear<number, number>;

	$: {
		xScale = d3
			.scaleTime<number, number>()
			.domain(d3.extent(weight.map((d) => d.date)) as [Date, Date])
			.range([margin.left, width - margin.right]);

		yScale = d3
			.scaleLinear<number, number>()
			.domain(d3.extent(weight.map((d) => d.weight)) as [number, number])
			.range([height - margin.bottom, margin.top]);

		let line = d3
			.line<Omit<Weight, 'date'> & { date: Date }>()
			.x((d) => xScale(d.date))
			.y((d) => yScale(d.weight));

		result = line(weight);
	}
</script>

<div class="flex flex-col justify-between items-center mb-4">
	<h1 class="text-3xl font-bold">Home</h1>
</div>

<div class="w-full h-[500px] text-custom-red" bind:clientHeight={height} bind:clientWidth={width}>
	<svg class="bg-zinc-800" viewBox="0 0 {width} {height}">
		{#each yScale.ticks(5) as max}
			<g transform="translate(10,{yScale(max)})" class="text-zinc-200">
				<line
					x1={margin.left}
					x2={width - margin.right}
					stroke="currentColor"
					stroke-dasharray="1,6"
				/>
				<text alignment-baseline="middle" class="text-[10px]" fill="currentColor"
					>{max.toFixed(1)}</text
				>
			</g>
		{/each}

		{#each xScale.ticks(5) as date}
			<g transform="translate({xScale(date) - 20},{height - 10})" class="text-zinc-200">
				<text class="text-[10px]" fill="currentColor">{format(date, 'dd MMM yy')}</text>
			</g>
		{/each}

		<path d={result} fill="none" stroke-width="2" stroke="currentColor" />

		{#each weight as weight}
			<circle
				fill="currentColor"
				stroke={colors.zinc[800]}
				stroke-width="2"
				r="5"
				cx={xScale(weight.date)}
				cy={yScale(weight.weight)}
			/>
		{/each}
	</svg>
</div>
