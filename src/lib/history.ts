import { Array, Number, Option, String, pipe, Schema } from "effect";

const historyStorageKey = "nonogram-helper.history";
const maxHistoryCount = 8;

const PositiveInteger = Schema.Int.pipe(Schema.greaterThan(0));

const HistoryItemSchema = Schema.Struct({
    clues: Schema.NonEmptyArray(PositiveInteger),
    squareCount: PositiveInteger,
});

export type HistoryItem = typeof HistoryItemSchema.Type;

export type FormValue = {
    clues: ReadonlyArray<number>;
    squareCount: number;
};

export const parseClues = (input: string): number[] => {
    const normalizedInput = String.trim(input);

    return String.isNonEmpty(normalizedInput)
        ? pipe(
              normalizedInput,
              String.split(/\s+/),
              Array.map((s) => Number.parse(s).pipe(Option.getOrElse(() => 0))),
          )
        : [];
};

export const serializeClues = (clues: ReadonlyArray<number>): string =>
    pipe(
        clues,
        Array.map((n) => n.toString()),
        Array.join(" "),
    );

export const canSaveHistoryItem = Schema.is(HistoryItemSchema);

export const toHistoryItem = Schema.decodeUnknownOption(HistoryItemSchema);

export const getHistoryItemKey = (item: FormValue): string =>
    `${serializeClues(item.clues)}-${item.squareCount}`;

const isSameHistoryItem = (a: HistoryItem, b: HistoryItem): boolean =>
    Schema.equivalence(HistoryItemSchema)(a, b);

const normalizeHistoryItem = (item: unknown): HistoryItem | null => {
    return Schema.decodeUnknownOption(HistoryItemSchema)(item).pipe(Option.getOrElse(() => null));
};

export const loadHistory = (): HistoryItem[] => {
    const rawHistory = localStorage.getItem(historyStorageKey);

    if (rawHistory === null) {
        return [];
    }

    try {
        const parsedHistory: unknown = JSON.parse(rawHistory);

        if (!Array.isArray(parsedHistory)) {
            return [];
        }

        return parsedHistory.flatMap((item) => {
            const normalized = normalizeHistoryItem(item);

            return normalized === null ? [] : [normalized];
        });
    } catch {
        return [];
    }
};

export const saveHistory = (history: HistoryItem[]): void => {
    localStorage.setItem(historyStorageKey, JSON.stringify(history));
};

export const addHistoryItem = (history: HistoryItem[], item: HistoryItem): HistoryItem[] =>
    [item, ...history.filter((historyItem) => !isSameHistoryItem(historyItem, item))].slice(
        0,
        maxHistoryCount,
    );
