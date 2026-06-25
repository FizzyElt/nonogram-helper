import { defineConfig } from '@pandacss/dev';

export default defineConfig({
    preflight: true,
    include: ['./src/**/*.{js,ts,svelte}'],

    exclude: [],

    // The output directory for your css system
    outdir: 'styled-system',
    theme: {
        extend: {
            tokens: {
                colors: {
                    black: { value: '#000000' },
                    white: { value: '#ffffff' },
                    'gray.50': { value: '#fafafa' },
                    'gray.100': { value: '#f4f4f5' },
                    'gray.200': { value: '#e4e4e7' },
                    'gray.300': { value: '#d4d4d8' },
                    'gray.400': { value: '#a1a1aa' },
                    'gray.500': { value: '#71717a' },
                    'gray.600': { value: '#52525b' },
                    'gray.700': { value: '#3f3f46' },
                    'gray.800': { value: '#27272a' },
                    'gray.900': { value: '#18181b' },
                    'gray.950': { value: '#111111' },
                },
            },
        },
    },
});
