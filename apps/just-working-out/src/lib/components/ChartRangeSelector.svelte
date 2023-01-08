<script lang="ts">
	type Filter = 'week' | 'month' | 'quarter' | 'half' | 'year';

	let filter: Filter = 'month';
</script>

<div class="flex flex-row gap-4 items-center justify-center">
	<select bind:value={filter} name="filter" class="bg-zinc-900 pr-0 outline-none text-center">
		<option value="week">Last Week</option>
		<option value="month">Last Month</option>
		<option value="quarter">Last Quarter</option>
		<option value="half">Last 6 Months</option>
		<option value="year">Last Year</option>
		<option />
	</select>
	<a href="/?filter={filter}" class="text-custom-green hover:text-custom-red">Refresh</a>
</div>
