import type { Weight } from '$lib/xata';
import { getXataClient } from '$lib/xataClient';
import { sub } from 'date-fns';
import type { PageServerLoad } from './$types';

const xata = getXataClient();

export const load = (async ({ url }) => {
	const filter = url.searchParams.get('filter') ?? 'month';

	const filterQuery = {
		date: {
			$gt: sub(new Date(), {
				[filter === 'half' || filter === 'quarter' ? 'months' : `${filter}s`]:
					filter === 'half' ? 6 : filter === 'quarter' ? 4 : 1
			})
		}
	};

	const records = await xata.db.weight.filter(filterQuery).sort('date', 'asc').getAll();
	return { records: records as Weight[] };
}) satisfies PageServerLoad;
