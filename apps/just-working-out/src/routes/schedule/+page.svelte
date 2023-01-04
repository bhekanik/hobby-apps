<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import CardBody from '$lib/components/CardBody.svelte';
	import CardHeading from '$lib/components/CardHeading.svelte';
	import CardSection from '$lib/components/CardSection.svelte';
	import CardSectionHeading from '$lib/components/CardSectionHeading.svelte';
	import CoolDown from '$lib/components/CoolDown.svelte';
	import ExerciseList from '$lib/components/ExerciseList.svelte';
	import WarmUp from '$lib/components/WarmUp.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col justify-between items-center mb-4">
	<h1 class="text-3xl font-bold">Workout Schedule</h1>
</div>
<div class="grid md:grid-cols-2 gap-4">
	{#each data.workouts.sort((a, b) => a.fields.order - b.fields.order) as workout}
		<Card>
			<CardHeading>{workout.fields.title}</CardHeading>
			<span class="text-zinc-500 m-8">{workout.fields.day}</span>

			<CardBody>
				<CardSection>
					<CardSectionHeading>Warm Up</CardSectionHeading>
					<WarmUp {workout} />
				</CardSection>

				<CardSection>
					<CardSectionHeading>Exercises:</CardSectionHeading>
					<ExerciseList {workout} />
				</CardSection>

				<CardSection>
					<CardSectionHeading>Cool Down:</CardSectionHeading>
					<CoolDown {workout} />
				</CardSection>
			</CardBody>
		</Card>
	{/each}
</div>
