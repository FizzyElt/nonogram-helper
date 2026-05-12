<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { getHistoryItemKey, serializeClues, type HistoryItem } from "$lib/history";
    import { ChevronDown, History } from "@lucide/svelte";

    interface HistoryListProps {
        history: HistoryItem[];
        onApply: (item: HistoryItem) => void;
    }

    const { history, onApply }: HistoryListProps = $props();
    let isOpen = $state(false);

    const applyItem = (item: HistoryItem) => {
        onApply(item);
        isOpen = false;
    };
</script>

{#if history.length > 0}
    <section class="w-full">
        <div class="md:hidden">
            <Button
                type="button"
                variant="outline"
                class="w-full justify-between"
                aria-expanded={isOpen}
                onclick={() => (isOpen = !isOpen)}
            >
                <span class="flex min-w-0 items-center gap-2">
                    <History size="20px" />
                    <span>History</span>
                </span>
                <span class="flex shrink-0 items-center gap-2 text-muted-foreground">
                    {history.length}
                    <ChevronDown
                        class={isOpen ? "rotate-180 transition-transform" : "transition-transform"}
                    />
                </span>
            </Button>
            {#if isOpen}
                <div class="mt-2 flex max-h-56 flex-col gap-2 overflow-y-auto pr-1">
                    {#each history as item (getHistoryItemKey(item))}
                        <Button
                            type="button"
                            variant="outline"
                            class="h-auto w-full justify-between px-3 py-2 text-left"
                            onclick={() => applyItem(item)}
                        >
                            <span class="truncate">{serializeClues(item.clues)}</span>
                            <span class="ml-3 shrink-0 text-muted-foreground"
                                >x{item.squareCount}</span
                            >
                        </Button>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="hidden rounded-md border bg-background p-3 shadow-xs md:block">
            <div class="flex items-center justify-between gap-2 text-sm font-medium">
                <span class="flex min-w-0 items-center gap-2">
                    <History size="20px" />
                    <span>History</span>
                </span>
                <span class="shrink-0 text-muted-foreground">{history.length}</span>
            </div>
            <div class="mt-3 flex max-h-64 flex-col gap-2 overflow-y-auto pr-1">
                {#each history as item (getHistoryItemKey(item))}
                    <Button
                        type="button"
                        variant="outline"
                        class="h-auto w-full justify-between px-3 py-2 text-left"
                        onclick={() => applyItem(item)}
                    >
                        <span class="truncate">{serializeClues(item.clues)}</span>
                        <span class="ml-3 shrink-0 text-muted-foreground">x{item.squareCount}</span>
                    </Button>
                {/each}
            </div>
        </div>
    </section>
{/if}
