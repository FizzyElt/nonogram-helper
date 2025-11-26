<script lang="ts">
	import { clsx } from "clsx";
	interface RowProps {
		clues: boolean[];
		lowOpacity?: boolean;
	}

	const { clues, lowOpacity = false }: RowProps = $props();
</script>

{#if clues.length > 0}
	<div class={clsx("flex w-fit", lowOpacity ? "opacity-40" : undefined)}>
		{#each clues as fill, idx}
			<div
				class={clsx(
					"h-12 w-12 border-y border-r border-primary",
					fill ? "bg-emerald-600" : undefined,
					idx % 5 === 0 ? "border-l" : undefined
				)}
				data-active={fill ? "" : undefined}
			></div>
		{/each}
	</div>
{/if}
