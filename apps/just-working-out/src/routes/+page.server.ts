import type { Sleep, Weight } from '$lib/xata';
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

	const weight = await xata.db.weight.filter(filterQuery).sort('date', 'asc').getAll();
	const sleep = await xata.db.sleep.filter(filterQuery).sort('date', 'asc').getAll();

	return { weight: weight as Weight[], sleep: sleep as Sleep[] };
}) satisfies PageServerLoad;
