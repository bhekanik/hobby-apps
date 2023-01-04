<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Meal Plan</h1>

<pre class="overflow-auto h-[1000px]">{JSON.stringify(
		data.meal.map((item) => item.fields.title),
		null,
		2
	)}
	</pre>
