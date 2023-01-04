import type { IEntry } from '$lib/generated/contentful';
import { contentfulClient } from '$lib/server/contentfulClient';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const entries = await contentfulClient.getEntries<IEntry>();

	if (entries) {
		return { entries: entries.items };
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
