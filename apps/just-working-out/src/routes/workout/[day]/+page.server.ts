import { getWorkouts } from '$lib/server/getWorkouts';
import { error } from '@sveltejs/kit';
import Case from 'case';
import { format } from 'date-fns';
import type { PageServerLoad } from '../$types';

export const load = (async ({ params }) => {
	const day = Case.sentence(params.day);

	const workouts = await getWorkouts({ 'fields.day': day ?? format(new Date(), 'EEEE') });

	if (workouts) {
		return { workout: workouts[0] };
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
