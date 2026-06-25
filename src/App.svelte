<script lang="ts">
    import "./app.css";
    import { Button } from "$lib/components/ui/button";
    import * as Field from "$lib/components/ui/field";
    import { Input } from "$lib/components/ui/input";
    import { parseClues, serializeClues, type FormValue, type HistoryItem } from "$lib/history";
    import { createHistoryState } from "$lib/history-state.svelte";
    import HistoryList from "$lib/HistoryList.svelte";
    import Row from "$lib/Row.svelte";
    import { pipe, Number, Array, Option } from "effect";

    import { fillClues, calcFillClues } from "./utils";

    const initClues = [3, 8, 5];
    const initRowLen = 20;

    let value = $state("");
    let rowLenValue = $state("");
    let clues = $state<number[]>([]);
    let rowLen = $state(0);
    const history = createHistoryState();

    const isApplied = $derived(!(clues.length === 0 && rowLen === 0));

    const { leftClues, filledClues } = $derived.by(() => {
        if (isApplied) {
            return {
                leftClues: fillClues(clues, rowLen),
                filledClues: calcFillClues(clues, rowLen),
            };
        }

        return {
            leftClues: fillClues(initClues, initRowLen),
            filledClues: calcFillClues(initClues, initRowLen),
        };
    });

    const applyValues = (nextClues: ReadonlyArray<number>, nextRowLen: number) => {
        clues = [...nextClues];
        rowLen = nextRowLen;
        value = serializeClues(nextClues);
        rowLenValue = nextRowLen.toString();
    };

    const applyHistory = (item: HistoryItem) => {
        applyValues(item.clues, item.squareCount);
    };

    const submit = (
        e: SubmitEvent & {
            currentTarget: EventTarget & HTMLFormElement;
        },
    ) => {
        e.preventDefault();
        const nextClues = parseClues(value);
        const nextRowLen = Number.parse(rowLenValue).pipe(Option.getOrElse(() => 0));

        applyValues(nextClues, nextRowLen);

        const historyItem: FormValue = {
            clues: nextClues,
            squareCount: nextRowLen,
        };

        history.add(historyItem);
    };
</script>

<main>
    <Button>hello world</Button>
</main>
