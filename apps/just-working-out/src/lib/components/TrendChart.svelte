<script lang="ts">
	import * as d3 from 'd3';
	import { format } from 'date-fns';
	import * as ss from 'simple-statistics';
	import colors from 'tailwindcss/colors';

	let height: number;
	let width: number;

	interface Data {
		date: Date;
		value: number;
	}

	export let data: Data[];
	export let title: string;

	let result: string | null = '';
	let trendLine: string | null = '';

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
			.domain(d3.extent(data.map((d) => d.date)) as [Date, Date])
			.range([margin.left, width - margin.right]);

		yScale = d3
			.scaleLinear<number, number>()
			.domain(d3.extent(data.map((d) => d.value)) as [number, number])
			.range([height - margin.bottom, margin.top]);

		let line = d3
			.line<Data>()
			.x((d) => xScale(d.date))
			.y((d) => yScale(d.value));

		result = line(data);

		const regression = ss.linearRegression(data.map((w) => [+w.date, w.value]));
		const regressionLine = ss.linearRegressionLine(regression);

		const trendLineData = xScale.domain().map((x) => ({ date: x, value: regressionLine(+x) }));

		trendLine = line(trendLineData);
	}
</script>

<div class="flex flex-col gap-4">
	<div
		class="flex flex-col md:flex-row md:gap-4 justify-center md:justify-between items-center w-full text-white"
	>
		<h2 class="text-lg md:text-xl px-8 w-full text-center md:text-left">{title}</h2>
	</div>

	<div class="w-full h-[300px] text-custom-red" bind:clientHeight={height} bind:clientWidth={width}>
		<svg class="bg-zinc-800 rounded-3xl p-8" viewBox="0 0 {width} {height}">
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
			<path
				stroke-dasharray="6,6"
				d={trendLine}
				fill="none"
				stroke-width="2"
				stroke={colors.green[500]}
			/>

			{#each data as weight}
				<circle
					fill="currentColor"
					stroke={colors.zinc[800]}
					stroke-width="2"
					r="5"
					cx={xScale(weight.date)}
					cy={yScale(weight.value)}
				/>
			{/each}
		</svg>
	</div>
</div>
