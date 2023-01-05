<script lang="ts">
	import * as d3 from 'd3';
	import { format } from 'date-fns';
	import * as ss from 'simple-statistics';
	import colors from 'tailwindcss/colors';

	let height: number;
	let width: number;

	type Filter = 'week' | 'month' | 'quarter' | 'half' | 'year';
	interface Data {
		date: Date;
		value: number;
	}

	let filter: Filter = 'month';

	export let data: Data[];
	export let title: string;

	let result: string | null = '';
	let trendline: string | null = '';

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

		trendline = line(trendLineData);
	}
</script>

<div
	class="w-full mb-8 h-[300px] text-custom-red"
	bind:clientHeight={height}
	bind:clientWidth={width}
>
	<div class="flex gap-4 justify-between items-center w-full text-white">
		<h2 class="mt-2 mb-4 text-2xl px-8 w-full">{title}</h2>
		<div class="flex gap-4 items-center justify-center">
			<p>Last</p>
			<select bind:value={filter} name="filter" class="bg-zinc-900 pr-0 outline-none text-center">
				<option value="week">Week</option>
				<option value="month">Month</option>
				<option value="quarter">Quarter</option>
				<option value="half">6 Months</option>
				<option value="year">Year</option>
				<option />
			</select>
			<a href="/?filter={filter}" class="p-4 text-custom-green hover:text-custom-red">Refresh</a>
		</div>
	</div>

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
			d={trendline}
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