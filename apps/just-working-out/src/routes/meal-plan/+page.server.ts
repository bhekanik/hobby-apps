import type { IWorkoutFields } from '$lib/generated/contentful';
import { contentfulClient } from '$lib/server/contentfulClient';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const meals = await contentfulClient.getEntries<IWorkoutFields>({ content_type: 'meal' });

	if (meals) {
		return { meal: meals.items };
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
