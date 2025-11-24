<script lang="ts">
	import { clsx } from "clsx";
	interface RowProps {
		clues: boolean[];
	}

	const { clues }: RowProps = $props();
</script>

{#if clues.length > 0}
	<div class="grid auto-cols-fr grid-flow-col">
		{#each clues as fill, idx}
			<div
				class={clsx(
					"h-12 w-12 border-y border-r border-primary",
					fill ? "bg-emerald-600" : undefined,
					idx === 0 ? "border-l" : undefined
				)}
				data-active={fill ? "" : undefined}
			></div>
		{/each}
	</div>
{/if}
