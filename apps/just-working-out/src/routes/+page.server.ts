import type { Weight } from '$lib/xata';
import { getXataClient } from '$lib/xataClient';
import type { PageServerLoad } from './$types';

const xata = getXataClient();

export const load = (async () => {
	const records = await xata.db.weight.sort('date', 'asc').getAll();
	return { records: records as Weight[] };
}) satisfies PageServerLoad;
