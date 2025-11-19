<script lang="ts">
	import "./app.css";
	import { css } from "../styled-system/css";
	import { container, vstack, hstack } from "../styled-system/patterns";
	import Row from "./lib/Row.svelte";
	import Button from "./lib/Button.svelte";
	import Input from "./lib/Input.svelte";
	import { fillClues, calcFillClues } from "./utils";
	import { String, pipe, Number, Array, Option } from "effect";

	let value = $state("");

	let rowLenValue = $state("");

	let clues = $state<number[]>([]);

	let rowLen = $state(0);

	let leftClues = $derived(fillClues(clues, rowLen));
	let filledClues = $derived(calcFillClues(clues, rowLen));
</script>

<main>
	<div class={container({ mt: "20vh" })}>
		<h1 class={css({ fontSize: "4xl", textAlign: "center", mb: "10" })}>Nonogram Helper</h1>
	</div>
	<div class={container()}>
		<div class={vstack()}>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					console.log("send");
					clues = pipe(
						value,
						String.split(" "),
						Array.map((s) => Number.parse(s).pipe(Option.getOrElse(() => 0))),
						Array.filter((n) => n > 0)
					);
					rowLen = Number.parse(rowLenValue).pipe(Option.getOrElse(() => 0));
				}}
				class={css({ mx: "auto", width: "fit-content" })}
			>
				<div class={vstack()}>
					<Input {value} placeholder="3 12 3" onchange={(e) => (value = e.currentTarget.value)} />

					<div class={hstack()}>
						<Input
							value={rowLenValue}
							class={css({ width: "80px", textAlign: "center" })}
							onchange={(e) => (rowLenValue = e.currentTarget.value)}
						/>
						<Button onclick={() => (rowLenValue = "10")}>x10</Button>
						<Button onclick={() => (rowLenValue = "15")}>x15</Button>
						<Button onclick={() => (rowLenValue = "20")}>x20</Button>
						<Button onclick={() => (rowLenValue = "25")}>x25</Button>
					</div>
					<Button type="submit">apply</Button>
				</div>
			</form>
			<Row clues={leftClues} />
			<Row clues={filledClues} />
		</div>
	</div>
</main>

<style>
</style>
