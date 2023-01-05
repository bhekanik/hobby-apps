import type { Weight } from '$lib/xata';
import { getXataClient } from '$lib/xataClient';
import type { PageServerLoad } from './$types';

const xata = getXataClient();

export const load = (async ({ url }) => {
	const filter = url.searchParams.get('filter') ?? 'month';

	const filterQuery = {
		date: { $gt: '' }
	};

	const records = await xata.db.weight.sort('date', 'asc').getAll();
	return { records: records as Weight[] };
}) satisfies PageServerLoad;
