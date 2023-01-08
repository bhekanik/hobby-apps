<script lang="ts">
	import { page } from '$app/stores';
	import Card from '$lib/components/Card.svelte';
	import CardBody from '$lib/components/CardBody.svelte';
	import CardHeading from '$lib/components/CardHeading.svelte';
	import CardSectionHeading from '$lib/components/CardSectionHeading.svelte';
	import CoolDown from '$lib/components/CoolDown.svelte';
	import ExerciseList from '$lib/components/ExerciseList.svelte';
	import WarmUp from '$lib/components/WarmUp.svelte';
	import { config } from '$lib/config';
	import { add, format, sub } from 'date-fns';
	import type { PageData } from './$types';

	let currentDate = new Date();

	export let data: PageData;
</script>

<div class="flex flex-col justify-between items-center">
	<h1 class="text-3xl font-bold">Workout</h1>
	<span class="text-zinc-500">{format(new Date(), 'EEEE, d LLL')}</span>
</div>
<div class="flex justify-between w-full mb-4">
	<a
		class="flex-1 text-left"
		href={`/workout/${format(sub(currentDate, { days: 1 }), config.dayFormat)}`}
		>{$page.params.day === format(sub(new Date(), { days: 1 }), config.dayFormat)
			? ''
			: 'Yesterday'}</a
	>
	<a class="flex-1 text-center" href={`/workout/${format(new Date(), config.dayFormat)}`}
		>{$page.params.day === format(new Date(), config.dayFormat) ? '' : 'Today'}</a
	>
	<a
		class="flex-1 text-right"
		href={`/workout/${format(add(currentDate, { days: 1 }), config.dayFormat)}`}
		>{$page.params.day === format(add(new Date(), { days: 1 }), config.dayFormat)
			? ''
			: 'Tomorrow'}</a
	>
</div>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeading>{data.workout.fields.title}</CardHeading>

		<CardBody>
			<CardSectionHeading>Warm Up</CardSectionHeading>
			<WarmUp workout={data.workout} />

			<CardSectionHeading>Exercises:</CardSectionHeading>
			<ExerciseList workout={data.workout} />

			<CardSectionHeading>Cool Down:</CardSectionHeading>
			<CoolDown workout={data.workout} />
		</CardBody>
	</Card>
</div>
