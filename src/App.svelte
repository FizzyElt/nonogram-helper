<script lang="ts">
	import "./app.css";
	import { fillClues, calcFillClues } from "./utils";
	import { String, pipe, Number, Array, Option } from "effect";
	import Row from "$lib/Row.svelte";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";

	const initClues = [3, 8, 5];
	const initRowLen = 20;

	let value = $state("");
	let rowLenValue = $state("");
	let clues = $state<number[]>([]);
	let rowLen = $state(0);

	const isApplied = $derived(!(clues.length === 0 && rowLen === 0));

	const { leftClues, filledClues } = $derived.by(() => {
		if (isApplied) {
			return {
				leftClues: fillClues(clues, rowLen),
				filledClues: calcFillClues(clues, rowLen)
			};
		}

		return {
			leftClues: fillClues(initClues, initRowLen),
			filledClues: calcFillClues(initClues, initRowLen)
		};
	});
</script>

<main>
	<div class="mt-20 flex flex-col items-center gap-6">
		<h1 class="text-4xl font-bold">Nonogram Helper</h1>
		<div class="w-full max-w-xs overflow-scroll p-2">
			<form
				onsubmit={(e) => {
					e.preventDefault();
					clues = String.isNonEmpty(value)
						? pipe(
								value,
								String.trim,
								String.split(/\s+/),
								Array.map((s) => Number.parse(s).pipe(Option.getOrElse(() => 0)))
							)
						: [];

					rowLen = Number.parse(rowLenValue).pipe(Option.getOrElse(() => 0));
				}}
			>
				<Field.Set>
					<Field.Group>
						<Field.Field>
							<Field.Label>Clues</Field.Label>
							<Input
								class="max-w-xs"
								placeholder={pipe(
									initClues,
									Array.map((n) => n.toString()),
									Array.join(" ")
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
						</Field.Field>
						<Field.Field>
							<Field.Label>Square count</Field.Label>
							<div class="flex gap-x-1">
								<Input
									class="max-w-20 text-center"
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
								<Button class="flex-1" onclick={() => (rowLenValue = "15")}>x15</Button>
								<Button class="flex-1" onclick={() => (rowLenValue = "20")}>x20</Button>
								<Button class="flex-1" onclick={() => (rowLenValue = "25")}>x25</Button>
							</div>
						</Field.Field>
						<Field.Field orientation="horizontal">
							<Button type="submit" class="w-full">apply</Button>
						</Field.Field>
					</Field.Group>
				</Field.Set>
			</form>
		</div>
		<div class="mt-6 flex max-w-full flex-col gap-y-4 overflow-scroll p-4">
			<Row clues={leftClues} lowOpacity={!isApplied} />
			<Row clues={filledClues} lowOpacity={!isApplied} />
		</div>
	</div>
</main>
