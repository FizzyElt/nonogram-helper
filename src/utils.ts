import { Array, Option, pipe, Function, Number } from "effect";

export const calcFillClues = (clues: number[], rowLen: number): boolean[] => {
	if (rowLen === 0) {
		return [];
	}

	const total = Number.sumAll(clues) + clues.length - 1;

	const extra = rowLen - total;

	if (extra < 0) {
		return [];
	}

	const res = Array.makeBy(rowLen, () => false);
	let pos = 0;
	
	for (const clue of clues) {
		const start = pos + extra;
		const end = pos + clue - 1;

		for (let i = start; i <= end; i++) {
			res[i] = true;
		}

		pos += clue + 1;
	}

	return res;
};

export const fillClues = (
	clues: number[],
	rowLen: number,
	from: "left" | "right" = "left"
): boolean[] => {
	const flattenClues = pipe(
		clues,
		Array.map((c) => Array.replicate(true, c)),
		Array.reduce(Array.empty<boolean[]>(), (acc, clues) => Array.appendAll(acc, [clues, [false]])),
		Array.init,
		Option.getOrElse(() => Array.empty<boolean[]>()),
		Array.flatten,
		from === "left" ? Function.identity : Array.reverse
	);

	if (rowLen <= 0) {
		return [];
	}

	return pipe(
		Array.makeBy(rowLen, (n) => Array.get(flattenClues, n).pipe(Option.getOrElse(() => false))),
		from === "left" ? Function.identity : Array.reverse
	);
};
