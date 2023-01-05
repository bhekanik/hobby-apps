<script lang="ts">
	export let value: number = 50.0;
	export let buttonText: string = 'Submit';
</script>

<fieldset class="flex gap-4 bg-zinc-800 p-8 pr-11 rounded-3xl">
	<label class="flex flex-col gap-4 items-center">
		Hours
		<input
			type="number"
			name="value"
			min={0.0}
			max={24.0}
			step={0.1}
			{value}
			class="bg-zinc-800 p-4 text-2xl text-center outline-none"
		/>
	</label>
	<label class="flex flex-col gap-4 items-center">
		Unit
		<select name="unit" value="hrs" class="bg-zinc-800 p-4 pr-0 text-2xl outline-none text-center">
			<option value="hrs">HRS</option>
			<option value="mins">MINS</option>
		</select>
	</label>
</fieldset>

<fieldset class="flex flex-col sm:flex-row items-center justify-between">
	<slot />
	<button class="text-xl p-4 text-custom-green hover:text-custom-red">{buttonText}</button>
</fieldset>
