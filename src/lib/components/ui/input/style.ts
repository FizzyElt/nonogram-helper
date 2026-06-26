import { cva, type RecipeVariant } from "$styled-system/css";

export const inputStyle = cva({
    base: {
        width: "100%",
        minWidth: "0",
        outline: "0",
        position: "relative",
        appearance: "none",
        textAlign: "start",
        borderRadius: "sm",
        _disabled: {
            cursor: "not-allowed",
        },
        height: "auto",
        minW: "auto",
        "--focus-color": "colors.gray.400",
        "--error-color": "#dc2626",
        _invalid: {
            focusRingColor: "var(--error-color)",
            borderColor: "var(--error-color)",
        },
    },

    variants: {
        variant: {
            outline: {
                bg: "transparent",
                borderWidth: "1px",
                borderColor: "gray.200",
                focusVisibleRing: "inside",
                focusRingColor: "var(--focus-color)",
            },
        },
        size: {
            "2xs": {
                textStyle: "xs",
                px: "2",
                h: "7",
            },
            xs: {
                textStyle: "xs",
                px: "2",
                h: "8",
            },
            sm: {
                textStyle: "sm",
                px: "2.5",
                h: "9",
            },
            md: {
                textStyle: "sm",
                px: "3",
                h: "10",
            },
            lg: {
                textStyle: "md",
                px: "4",
                h: "11",
            },
            xl: {
                textStyle: "md",
                px: "4.5",
                h: "12",
            },
            "2xl": {
                textStyle: "lg",
                px: "5",
                h: "16",
            },
        },
    },
});

export type InputVariants = RecipeVariant<typeof inputStyle>;
