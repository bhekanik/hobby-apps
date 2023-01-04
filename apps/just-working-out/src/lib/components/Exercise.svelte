<script lang="ts">
	import type { IExercise } from '$lib/generated/contentful';

	export let exercise: IExercise;
</script>

<li class="pb-2 relative">
	<h4 class="text-md font-light">{exercise.fields.name}</h4>
	{#if exercise.fields.sets}
		<span class="text-3xl text-[#30d158]">{exercise.fields.sets} sets</span>
	{/if}

	{#if exercise.fields.reps}
		<span class="text-3xl text-[#30d158]"
			>{exercise.fields.sets ? 'of ' : ''}{exercise.fields.reps} reps</span
		>
	{/if}
	{#if exercise.fields.duration}
		<span class="text-3xl text-[#30d158]"
			>{exercise.fields.sets ? 'of ' : ''}{exercise.fields.duration}
			{exercise.fields.duration === 1 ? 'min' : 'mins'}</span
		>
	{/if}
</li>
