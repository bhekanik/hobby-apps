<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LogSleepFormFields from '$lib/components/LogSleepFormFields.svelte';
	import { format } from 'date-fns';

	let value = $page.data.value;
	let id = $page.data.id;
</script>

<h2 class="w-full text-2xl mt-4 mb-2 text-center">Edit Sleep Log</h2>
<p class="w-full text-center">
	Update your sleep log for {format(new Date($page.data.date), 'EEEE, d LLLL yyyy')}
</p>

<form method="post" class="w-full p-8" use:enhance>
	<fieldset class="flex gap-4 flex-col items-center">
		<input type="hidden" name="id" value={id} />
		<LogSleepFormFields buttonText="Update" {value}>
			<a
				class="text-xl p-4 text-custom-red hover:text-custom-green"
				href="/sleep-tracker/{$page.params.date}">Cancel</a
			>
		</LogSleepFormFields>
	</fieldset>
</form>
