import { Array, Option, pipe, Function, Number } from "effect";

export const calcFillClues = (clues: number[], rowLen: number): boolean[] => {
	if (rowLen === 0) {
		return [];
	}

	const total = Number.sumAll(clues) + clues.length - 1;

	const diff = rowLen - total;

	if (diff < 0) {
		return [];
	}

	let index = 0;
	const list = [];
	for (const clue of clues) {
		const start = index;
		const end = index + clue - 1;

		if (start + diff <= end) {
			list.push({ start: start + diff, end: end });
		}

		index += clue + 1;
	}

	const res = Array.makeBy(rowLen, () => false);

	for (const item of list) {
		for (let i = item.start; i <= item.end; i++) {
			res[i] = true;
		}
	}

	console.log(res);
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
