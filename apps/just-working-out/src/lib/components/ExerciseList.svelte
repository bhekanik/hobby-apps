<script lang="ts">
	import Exercise from '$lib/components/Exercise.svelte';
	import type { IWorkoutFields } from '$lib/generated/contentful';
	import type { Entry } from 'contentful';

	export let workout: Entry<IWorkoutFields>;
</script>

<ul class="grid md:grid-cols-2">
	{#each workout.fields.exercises as exercise}
		<Exercise {exercise} />
	{/each}
</ul>
