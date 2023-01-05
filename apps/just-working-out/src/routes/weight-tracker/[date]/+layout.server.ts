import type { Weight } from '$lib/xata';
import { getXataClient } from '$lib/xataClient';
import { sub } from 'date-fns';
import type { LayoutServerLoad } from './$types';

const xata = getXataClient();

export const load = (async ({ params }) => {
	const date = params.date;
	const record = await xata.db.weight.filter({ date: new Date(date) }).getFirst();
	const previousDayRecord = await xata.db.weight
		.filter({ date: sub(new Date(date), { days: 1 }) })
		.getFirst();

	return { ...record, previousDayWeight: previousDayRecord?.weight } as Weight & {
		previousDayWeight?: number;
	};
}) satisfies LayoutServerLoad;
