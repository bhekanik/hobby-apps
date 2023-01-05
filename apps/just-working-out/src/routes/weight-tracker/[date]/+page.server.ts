import type { Weight } from '$lib/xata';
import { getXataClient } from '$lib/xataClient';
import type { Actions } from '../$types';

const xata = getXataClient();

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const weight = data.get('weight') as string;
		const date = data.get('date') as string;
		const unit = data.get('unit') as string;

		const newWeightLog: Omit<Weight, 'id'> = {
			created_at: new Date(),
			date: new Date(date),
			weight: +weight,
			unit: unit
		};

		const record = await xata.db.weight.create(newWeightLog);

		return { success: true, record };
	}
};
