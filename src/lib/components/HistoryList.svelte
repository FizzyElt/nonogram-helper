<script lang="ts" module>
    const styles = {
        root: css({ w: "full" }),
        mobileOnly: css({ display: { base: "block", md: "none" } }),
        desktopOnly: css({
            bg: "white",
            borderColor: "gray.200",
            borderRadius: "md",
            borderWidth: "1px",
            boxShadow: "xs",
            display: { base: "none", md: "block" },
            p: 3,
        }),
        trigger: css({ justifyContent: "space-between", w: "full" }),
        header: css({
            alignItems: "center",
            display: "flex",
            fontSize: "sm",
            fontWeight: "medium",
            gap: 2,
            justifyContent: "space-between",
        }),
        title: css({
            alignItems: "center",
            display: "flex",
            gap: 2,
            minW: 0,
        }),
        mutedInline: css({
            alignItems: "center",
            color: "gray.500",
            display: "flex",
            flexShrink: 0,
            gap: 2,
        }),
        muted: css({
            color: "gray.500",
            flexShrink: 0,
        }),
        mobileList: css({
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxH: 56,
            mt: 2,
            overflowY: "auto",
            pr: 1,
        }),
        desktopList: css({
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxH: 64,
            mt: 3,
            overflowY: "auto",
            pr: 1,
        }),
        itemButton: css({
            h: "auto",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            textAlign: "left",
            w: "full",
        }),
        clueText: css({
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        }),
        count: css({
            color: "gray.500",
            flexShrink: 0,
            ml: 3,
        }),
    };
</script>

<script lang="ts">
    import { ChevronDown, History } from "@lucide/svelte";

    import { Button } from "$lib/components/ui/button";
    import { getHistoryItemKey, serializeClues, type HistoryItem } from "$lib/history";
    import { css } from "$styled-system/css";

    interface HistoryListProps {
        history: HistoryItem[];
        onApply: (item: HistoryItem) => void;
    }

    const { history, onApply }: HistoryListProps = $props();
    let isOpen = $state(false);

    const applyItem = (item: HistoryItem) => {
        onApply(item);
    };

    const chevronStyle = (open: boolean) =>
        css({
            transform: open ? "rotate(180deg)" : undefined,
            transitionProperty: "transform",
            transitionDuration: "150ms",
        });
</script>

{#if history.length > 0}
    <section class={styles.root}>
        <div class={styles.mobileOnly}>
            <Button
                type="button"
                variant="outline"
                class={styles.trigger}
                aria-expanded={isOpen}
                onclick={() => (isOpen = !isOpen)}
            >
                <span class={styles.title}>
                    <History size="20px" />
                    <span>History</span>
                </span>
                <span class={styles.mutedInline}>
                    {history.length}
                    <ChevronDown class={chevronStyle(isOpen)} />
                </span>
            </Button>
            {#if isOpen}
                <div class={styles.mobileList}>
                    {#each history as item (getHistoryItemKey(item))}
                        <Button
                            type="button"
                            variant="outline"
                            class={styles.itemButton}
                            onclick={() => applyItem(item)}
                        >
                            <span class={styles.clueText}>{serializeClues(item.clues)}</span>
                            <span class={styles.count}>x{item.squareCount}</span>
                        </Button>
                    {/each}
                </div>
            {/if}
        </div>

        <div class={styles.desktopOnly}>
            <div class={styles.header}>
                <span class={styles.title}>
                    <History size="20px" />
                    <span>History</span>
                </span>
                <span class={styles.muted}>{history.length}</span>
            </div>
            <div class={styles.desktopList}>
                {#each history as item (getHistoryItemKey(item))}
                    <Button
                        type="button"
                        variant="outline"
                        class={styles.itemButton}
                        onclick={() => applyItem(item)}
                    >
                        <span class={styles.clueText}>{serializeClues(item.clues)}</span>
                        <span class={styles.count}>x{item.squareCount}</span>
                    </Button>
                {/each}
            </div>
        </div>
    </section>
{/if}
