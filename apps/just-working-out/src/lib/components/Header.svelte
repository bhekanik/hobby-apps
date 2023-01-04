<script>
	import { format } from 'date-fns';
	import NavItem from './NavItem.svelte';
</script>

<header
	class="flex flex-col md:flex-row pt-8 md:pt-0 gap-4 w-full justify-between items-center px-8"
>
	<h1 class="text-2xl font-light text-custom-blue">
		<a href="/">Just Working Out</a>
	</h1>

	<nav>
		<ul class="flex gap-2 md:gap-4">
			<NavItem href={`/workout/${format(new Date(), 'EEEE')}`}>Workout</NavItem>
			<NavItem href="/schedule">Schedule</NavItem>
		</ul>
	</nav>
</header>
