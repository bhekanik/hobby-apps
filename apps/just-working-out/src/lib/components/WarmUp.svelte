<script lang="ts">
	import type { IWorkoutFields } from '$lib/generated/contentful';
	import type { Entry } from 'contentful';

	export let workout: Entry<IWorkoutFields>;
</script>

<div class="pb-2 relative border-b-[1px] border-zinc-700">
	<h4 class="text-md font-light">{workout.fields.warmUp?.fields.name}</h4>
	{#if workout.fields.warmUpDuration}
		<p class="text-3xl text-[#ff443a]">{workout.fields.warmUpDuration} mins</p>
	{/if}
</div>
