import {
    addHistoryItem,
    loadHistory,
    saveHistory,
    toHistoryItem,
    type HistoryItem,
    type FormValue,
} from "$lib/history";
import { Option, pipe } from "effect";
import { onMount } from "svelte";

interface CreateHistoryStateReturn {
    add: (item: FormValue) => void;
    items: HistoryItem[];
}

export const createHistoryState = (): CreateHistoryStateReturn => {
    let items = $state<HistoryItem[]>([]);
    let isReady = $state(false);

    const add = (item: FormValue) => {
        pipe(
            toHistoryItem(item),
            Option.match({
                onNone: () => undefined,
                onSome: (historyItem) => {
                    items = addHistoryItem(items, historyItem);
                },
            }),
        );
    };

    onMount(() => {
        items = loadHistory();
        isReady = true;
    });

    $effect(() => {
        if (isReady) {
            saveHistory(items);
        }
    });

    return {
        add,
        get items(): HistoryItem[] {
            return items;
        },
    };
};
