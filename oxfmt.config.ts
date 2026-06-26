import { defineConfig } from "oxfmt";

export default defineConfig({
    ignorePatterns: [],
    tabWidth: 4,
    printWidth: 100,
    endOfLine: "lf",
    semi: true,
    singleQuote: false,
    sortImports: {
        customGroups: [
            { elementNamePattern: ["$lib/**", "$styled-system/*"], groupName: "ui-group" },
        ],
        groups: [
            "type-import",
            ["value-builtin", "value-external"],
            "type-internal",
            ["value-internal", "ui-group"],
            ["type-parent", "type-sibling", "type-index"],
            ["value-parent", "value-sibling", "value-index"],
            "unknown",
        ],
    },
    sortTailwindcss: true,
    svelte: true,
});
