import { cva, type RecipeVariant } from '$styled-system/css';

export const buttonStyle = cva({
    base: {
        display: 'inline-flex',
        appearance: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        position: 'relative',
        borderRadius: '0.25rem',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        borderWidth: '1px',
        borderColor: 'transparent',
        cursor: 'pointer',
        flexShrink: '0',
        outline: '0',
        lineHeight: '1.2',
        isolation: 'isolate',
        fontWeight: 'medium',
        _disabled: {
            cursor: 'not-allowed',
        },
    },
    variants: {
        visual: {
            solid: {
                bg: 'black',
                color: 'white',
                _hover: {
                    bg: 'gray.800',
                },
            },
        },
        size: {
            '2xs': {
                h: '24px',
                minW: '24px',
                fontSize: '0.75rem',
                px: '8px',
                gap: '4px',
            },
            xs: {
                h: '32px',
                minW: '32px',
                fontSize: '0.75rem',
                px: '10px',
                gap: '4px',
            },
            sm: {
                h: '36px',
                minW: '36px',
                px: '14px',
                fontSize: '0.875rem',
                gap: '8px',
            },
            md: {
                h: '40px',
                minW: '40px',
                fontSize: '0.875rem',
                px: '16px',
                gap: '8px',
            },
            lg: {
                h: '44px',
                minW: '44px',
                fontSize: '1rem',
                px: '20px',
                gap: '12px',
            },
            xl: {
                h: '48px',
                minW: '48px',
                fontSize: '1rem',
                px: '20px',
                gap: '10px',
            },
            '2xl': {
                h: '64px',
                minW: '64px',
                fontSize: '1.125rem',
                px: '28px',
                gap: '12px',
            },
        },
    },
});

export type ButtonVariants = RecipeVariant<typeof buttonStyle>;
