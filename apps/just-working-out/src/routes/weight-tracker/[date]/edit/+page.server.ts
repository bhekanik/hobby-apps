import { getXataClient } from '$lib/xataClient';
import { redirect, type Actions } from '@sveltejs/kit';

const xata = getXataClient();

export const actions: Actions = {
	default: async ({ request, params }) => {
		const date = params.date;
		const data = await request.formData();
		const id = data.get('id') as string;
		const weight = data.get('weight') as string;
		const unit = data.get('unit') as string;

		await xata.db.weight.update(id, {
			date,
			weight: +weight,
			unit: unit
		});

		throw redirect(302, `/weight-tracker/${date}`);
	}
};
