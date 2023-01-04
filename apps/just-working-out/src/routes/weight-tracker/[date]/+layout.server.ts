import { config } from '$lib/config';
import type { Weight } from '$lib/xata';
import { getXataClient } from '$lib/xataClient';
import { format, parseISO, sub } from 'date-fns';
import type { LayoutServerLoad } from './$types';

const xata = getXataClient();

export const load = (async ({ params }) => {
	const date = params.date;
	const record = await xata.db.weight.filter({ date }).getFirst();
	const previousDayRecord = await xata.db.weight
		.filter({ date: format(sub(new Date(parseISO(date)), { days: 1 }), config.dateFormat) })
		.getFirst();

	return { ...record, previousDayWeight: previousDayRecord?.weight } as Weight & {
		previousDayWeight?: number;
	};
}) satisfies LayoutServerLoad;
