<script lang="ts">
	import { spring } from 'svelte/motion';

	let count = 0;
	let step = 1;

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="flex border-t-[1px] border-b-[1px] border-solid border-[rgba(0,0,0,0.1)] my-4">
	<button
		class="w-[4em] p-0 flex items-center justify-center border-0 bg-tranparent touch-action-manipulation text-2xl hover:bg-[var(--color-bg-1)]"
		on:click={() => (count -= step)}
		aria-label="Decrease the counter by one"
	>
		<svg class="w-[25%] h-[25%]" aria-hidden="true" viewBox="0 0 1 1">
			<path
				class="vector-effects-non-scaling-stroke stroke-[2px] stroke-[#444]"
				d="M0,0.5 L1,0.5"
			/>
		</svg>
	</button>

	<div class="w-[8em] h-[4em] overflow-hidden text-center relative">
		<div class="absolute w-[100%] h-[100%]" style="transform: translate(0, {100 * offset}%)">
			<strong
				class="top-[-100%] user-select-none absolute flex w-[100%] h-[100%] font-weight-[400] text-[var(--color-theme-1)] text-[4rem] items-center justify-center"
				aria-hidden="true">{Math.floor($displayed_count + 1)}</strong
			>
			<strong
				class="flex w-[100%] h-[100%] font-weight-[400] text-[var(--color-theme-1)] text-[4rem] items-center justify-center"
				>{Math.floor($displayed_count)}</strong
			>
		</div>
	</div>

	<button
		class="w-[4em] p-0 flex items-center justify-center border-0 bg-tranparent touch-action-manipulation text-2xl hover:bg-[var(--color-bg-1)]"
		on:click={() => (count += step)}
		aria-label="Increase the counter by one"
	>
		<svg class="w-[25%] h-[25%]" aria-hidden="true" viewBox="0 0 1 1">
			<path
				class="vector-effects-non-scaling-stroke stroke-[2px] stroke-[#444]"
				d="M0,0.5 L1,0.5 M0.5,0 L0.5,1"
			/>
		</svg>
	</button>
</div>
