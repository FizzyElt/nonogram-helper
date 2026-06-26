<script lang="ts">
    import { pipe, Number, Array, Option } from "effect";

    import HistoryList from "$lib/components/HistoryList.svelte";
    import Row from "$lib/components/Row.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { parseClues, serializeClues, type FormValue, type HistoryItem } from "$lib/history";
    import { createHistoryState } from "$lib/history-state.svelte";
    import { css } from "$styled-system/css";
    import { center, grid, stack } from "$styled-system/patterns";

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

<div class={css({ mt: 16 })}>
    <h1 class={center({ fontSize: "4xl", fontWeight: "bold", m: "auto" })}>Nonogram Helper</h1>
    <div
        class={grid({
            px: 4,
            columns: { base: 1, md: 2 },
            gap: { base: 10, md: 4 },
            mt: 10,
            mx: "auto",
            maxW: { base: "auto", sm: "3xl" },
        })}
    >
        <form class={stack({ gap: 4, align: "stretch", w: "full" })} onsubmit={submit}>
            <div class={stack({ align: "stretch" })}>
                <label for="clues">Clues</label>
                <Input
                    name="clues"
                    size="sm"
                    placeholder={pipe(
                        initClues,
                        Array.map((n) => n.toString()),
                        Array.join(" "),
                    )}
                    bind:value={
                        () => value,
                        (v) => {
                            if (/^[0-9\s]*$/g.test(v)) {
                                value = v;
                            }
                        }
                    }
                />
            </div>
            <div class={stack()}>
                <label for="count">Square count</label>
                <div class={grid({ columns: 4, gap: 2 })}>
                    <Input
                        name="count"
                        size="sm"
                        class={css({ textAlign: "center" })}
                        placeholder={initRowLen.toString()}
                        bind:value={
                            () => rowLenValue,
                            (v) => {
                                if (/^[0-9]*$/g.test(v)) {
                                    rowLenValue = v;
                                }
                            }
                        }
                    />
                    <Button size="sm" onclick={() => (rowLenValue = "15")}>x15</Button>
                    <Button size="sm" onclick={() => (rowLenValue = "20")}>x20</Button>
                    <Button size="sm" onclick={() => (rowLenValue = "25")}>x25</Button>
                </div>
            </div>
            <Button type="submit" size="sm" class={css({ mt: "4" })}>apply</Button>
        </form>
        <HistoryList history={history.items} onApply={applyHistory} />
    </div>

    <section class={css({ mt: 6, mx: "auto", w: "fit-content", maxW: "full", px: 4 })}>
        <div
            class={stack({
                gap: 4,
                py: 4,
                overflowX: "auto",
            })}
        >
            <Row clues={leftClues} lowOpacity={!isApplied} />
            <Row clues={filledClues} lowOpacity={!isApplied} />
        </div>
    </section>
</div>
