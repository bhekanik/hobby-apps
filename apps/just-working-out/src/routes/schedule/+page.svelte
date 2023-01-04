<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import CardBody from '$lib/components/CardBody.svelte';
	import CardHeading from '$lib/components/CardHeading.svelte';
	import CardSectionHeading from '$lib/components/CardSectionHeading.svelte';
	import CoolDown from '$lib/components/CoolDown.svelte';
	import ExerciseList from '$lib/components/ExerciseList.svelte';
	import WarmUp from '$lib/components/WarmUp.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="mb-4 text-3xl font-bold">Workout Schedule</h1>
<div class="flex flex-col gap-4">
	{#each data.workouts as workout}
		<Card>
			<CardHeading>{workout.fields.title}</CardHeading>

			<CardBody>
				<CardSectionHeading>Warm Up</CardSectionHeading>
				<WarmUp {workout} />

				<CardSectionHeading>Exercises:</CardSectionHeading>
				<ExerciseList {workout} />

				<CardSectionHeading>Cool Down:</CardSectionHeading>
				<CoolDown {workout} />
			</CardBody>
		</Card>
	{/each}
</div>
