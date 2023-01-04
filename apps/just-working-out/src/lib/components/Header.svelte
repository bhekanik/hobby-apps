<script>
	import { format } from 'date-fns';
	import NavItem from './NavItem.svelte';
</script>

<header class="flex gap-4 w-full justify-between items-center px-8">
	<h1 class="text-md md:text-2xl font-light text-custom-green">
		<a href="/">Just Working Out</a>
	</h1>

	<nav>
		<ul class="flex gap-2 md:gap-4">
			<NavItem href="/schedule">Schedule</NavItem>
			<NavItem href={`/workout/${format(new Date(), 'EEEE')}`}>Workout</NavItem>
		</ul>
	</nav>
</header>
