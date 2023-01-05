import { getXataClient } from '$lib/xataClient';
import { redirect, type Actions } from '@sveltejs/kit';

const xata = getXataClient();

export const actions: Actions = {
	default: async ({ request, params }) => {
		const date = params.date;
		const data = await request.formData();
		const id = data.get('id') as string;
		const value = data.get('value') as string;
		const unit = data.get('unit') as string;

		await xata.db.sleep.update(id, {
			date: new Date(date as string),
			value: +value,
			unit: unit
		});

		throw redirect(302, `/sleep-tracker/${date}`);
	}
};
