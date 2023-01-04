import { getXataClient } from '$lib/xataClient';
import type { Actions } from '@sveltejs/kit';
import { format } from 'date-fns';

const xata = getXataClient();

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const weight = data.get('weight') as string;
		const unit = data.get('unit') as string;

		const record = await xata.db.weight.create({
			created_at: new Date(),
			date: format(new Date(), 'yyyy-LL-dd'),
			weight: +weight,
			unit: unit
		});

		return { success: true, record };
	}
};
