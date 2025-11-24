<script lang="ts">
	import "./app.css";
	import { fillClues, calcFillClues } from "./utils";
	import { String, pipe, Number, Array, Option } from "effect";
	import Row from "$lib/Row.svelte";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";

	let value = $state("");
	let rowLenValue = $state("");
	let clues = $state<number[]>([3, 3, 3, 3, 3]);
	let rowLen = $state(0);
	let leftClues = $derived(fillClues(clues, rowLen));
	let filledClues = $derived(calcFillClues(clues, rowLen));
</script>

<main>
	<div class="mt-20 flex flex-col items-center gap-6">
		<h1 class="text-4xl font-bold">Nonogram Helper</h1>
		<div class="w-full max-w-3xs">
			<form
				onsubmit={(e) => {
					e.preventDefault();
					clues = pipe(
						value,
						String.trim,
						String.split(" "),
						Array.map((s) => Number.parse(s).pipe(Option.getOrElse(() => 0)))
					);

					rowLen = Number.parse(rowLenValue).pipe(Option.getOrElse(() => 0));
				}}
			>
				<Field.Set>
					<Field.Group>
						<Field.Field>
							<Field.Label>Clues</Field.Label>
							<Input
								class="max-w-xs"
								placeholder="1 12 4"
								{value}
								onchange={(e) => (value = e.currentTarget.value)}
							/>
						</Field.Field>
						<Field.Field>
							<Field.Label>Square count</Field.Label>
							<div class="flex gap-x-1">
								<Input
									class="max-w-20 text-center"
									value={rowLenValue}
									onchange={(e) => (rowLenValue = e.currentTarget.value)}
								/>
								<Button class="flex-1" onclick={(e) => (rowLenValue = "15")}>x15</Button>
								<Button class="flex-1" onclick={(e) => (rowLenValue = "20")}>x20</Button>
								<Button class="flex-1" onclick={(e) => (rowLenValue = "25")}>x25</Button>
							</div>
						</Field.Field>
						<Field.Field orientation="horizontal">
							<Button type="submit" class="w-full">apply</Button>
						</Field.Field>
					</Field.Group>
				</Field.Set>
			</form>
		</div>
		<Row clues={leftClues} />
		<Row clues={filledClues} />
	</div>
</main>
