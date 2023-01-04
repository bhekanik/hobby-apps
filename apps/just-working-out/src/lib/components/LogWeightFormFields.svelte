<script lang="ts">
	export let value: number = 50.0;
	export let buttonText: string = 'Submit';
</script>

<fieldset class="flex gap-4">
	<label class="flex flex-col gap-4 items-center">
		Weight
		<input
			type="number"
			name="weight"
			min={50.0}
			max={90.0}
			step={0.1}
			{value}
			class="bg-zinc-900 border-[1px] rounded-md p-4 text-2xl text-center"
		/>
	</label>
	<label class="flex flex-col gap-4 items-center">
		Unit
		<select
			name="unit"
			value="kg"
			class="bg-zinc-900 border-[1px] rounded-md p-4 text-2xl text-center"
		>
			<option value="kg">KG</option>
			<option value="lbs">LBS</option>
		</select>
	</label>
</fieldset>

<fieldset class="flex flex-col sm:flex-row items-center justify-between">
	<slot />
	<button class="text-xl p-4 text-custom-green hover:text-custom-red">{buttonText}</button>
</fieldset>
