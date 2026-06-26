<script lang="ts">
    import { css } from "$styled-system/css";
    import { flex, square } from "$styled-system/patterns";

    interface RowProps {
        clues: boolean[];
        lowOpacity?: boolean;
    }

    const { clues, lowOpacity = false }: RowProps = $props();
</script>

{#if clues.length > 0}
    <div class={flex({ w: "fit-content", opacity: lowOpacity ? "0.4" : undefined })}>
        <!-- <div class={clsx("flex w-fit", lowOpacity ? "opacity-40" : undefined)}> -->
        {#each clues as fill, idx (idx)}
            <div
                class={square({
                    h: 12,
                    w: 12,
                    borderY: "1px solid #000000",
                    borderRight: "1px solid #000000",
                    borderLeft: idx % 5 === 0 ? "1px solid #000000" : undefined,
                    bg: fill ? "#0d9488" : undefined,
                })}
                // class={clsx(
                //     "border-primary h-12 w-12 border-y border-r",
                //     fill ? "bg-emerald-600" : undefined,
                //     idx % 5 === 0 ? "border-l" : undefined,
                // )}
                data-active={fill ? "" : undefined}
            ></div>
        {/each}
    </div>
{/if}
