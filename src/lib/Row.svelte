<script lang="ts">
	import { css, cva, cx } from "../../styled-system/css";
	import { grid, square } from "../../styled-system/patterns";
	import Square from "./Square.svelte";
	interface RowProps {
		clues: boolean[];
	}

	const { clues }: RowProps = $props();
</script>

{#if clues.length > 0}
	<div
		class={grid({
			width: "fit-content",
			gridAutoColumns: "1fr",
			gridAutoFlow: "column",
			gap: 0,
			border: "1px solid #222"
		})}
	>
		{#each clues as fill, idx}
			<div
				class={square({
					size: "50px",
					bgColor: "white",
					_active: { bgColor: "green" },
					borderLeft: idx === 0 ? undefined : "1px solid #222"
				})}
				data-active={fill ? "" : undefined}
			></div>
		{/each}
	</div>
{/if}
