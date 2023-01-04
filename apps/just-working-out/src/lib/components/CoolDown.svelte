<script lang="ts">
	import type { IWorkoutFields } from '$lib/generated/contentful';
	import type { Entry } from 'contentful';

	export let workout: Entry<IWorkoutFields>;
</script>

<div class="pb-2 relative">
	<h4 class="text-md font-light">{workout.fields.cooldown?.fields.name}</h4>
	{#if workout.fields.cooldownDuration}
		<p class="text-3xl text-[#63e6e2]">{workout.fields.cooldownDuration} mins</p>
	{/if}
</div>
