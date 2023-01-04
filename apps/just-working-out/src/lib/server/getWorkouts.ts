import type { IWorkoutFields } from '$lib/generated/contentful';
import { contentfulClient } from '$lib/server/contentfulClient';
import type { Entry } from 'contentful';

export const getWorkouts = async (
	query?: Record<string, unknown>
): Promise<Entry<IWorkoutFields>[]> => {
	const entries = await contentfulClient.getEntries<IWorkoutFields>(
		Object.assign({ content_type: 'workout' }, query)
	);

	return entries.items;
};
