<script>
	import { format } from 'date-fns';
	import NavItem from './NavItem.svelte';

	let today = format(new Date(), 'yyyy-LL-dd');
	let day = format(new Date(), 'EEEE');
</script>

<header
	class="flex flex-col md:flex-row pt-8 md:pt-0 gap-4 w-full justify-between items-center px-8"
>
	<h1 class="text-2xl font-light text-custom-blue">
		<a href="/">Just Working Out</a>
	</h1>

	<nav>
		<ul class="flex gap-2 md:gap-4">
			<NavItem href="/workout/{day}">Workout</NavItem>
			<NavItem href="/weight-tracker/{today}">Weight Tracker</NavItem>
			<NavItem href="/schedule">Schedule</NavItem>
		</ul>
	</nav>
</header>
