<script>
	import { config } from '$lib/config';
	import { format } from 'date-fns';
	import NavItem from './NavItem.svelte';

	let today = format(new Date(), config.dateFormat);
	let day = format(new Date(), config.dayFormat);
</script>

<header
	class="flex flex-col md:flex-row pt-8 md:pt-0 gap-4 w-full justify-between items-center px-8 sticky top-0 bg-zinc-900 z-50"
>
	<h1 class="text-2xl font-bold text-custom-blue">
		<a href="/">Just Working Out</a>
	</h1>

	<nav>
		<ul class="flex gap-2 md:gap-4">
			<NavItem href="/">Home</NavItem>
			<NavItem href="/workout/{day}">Workout</NavItem>
			<NavItem href="/weight-tracker/{today}">Weight Tracker</NavItem>
			<NavItem href="/schedule">Schedule</NavItem>
		</ul>
	</nav>
</header>
