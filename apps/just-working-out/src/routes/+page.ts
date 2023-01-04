import { redirect } from '@sveltejs/kit';
import { format } from 'date-fns';
import type { PageLoad } from './$types';

export const load = (async () => {
	throw redirect(302, `/workout/${format(new Date(), 'EEEE')}`);
}) satisfies PageLoad;
