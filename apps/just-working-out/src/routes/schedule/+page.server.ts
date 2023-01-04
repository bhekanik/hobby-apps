import { getWorkouts } from '$lib/server/getWorkouts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const workouts = await getWorkouts();

	if (workouts) {
		return { workouts };
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
