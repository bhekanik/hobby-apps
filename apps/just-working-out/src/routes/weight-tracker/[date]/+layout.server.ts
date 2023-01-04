import type { Weight } from '$lib/xata';
import { getXataClient } from '$lib/xataClient';
import type { LayoutServerLoad } from './$types';

const xata = getXataClient();

export const load = (async ({ params }) => {
	const date = params.date;
	const record = await xata.db.weight.filter({ date }).getAll();

	return record[0] as Weight;
}) satisfies LayoutServerLoad;
