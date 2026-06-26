<script lang="ts" module>
    import type { HTMLInputAttributes } from "svelte/elements";

    import { input as inputRecipe, type InputVariantProps } from "$styled-system/recipes";

    export interface InputProps extends Omit<HTMLInputAttributes, "size">, InputVariantProps {
        ref?: HTMLInputElement | null;
    }
</script>

<script lang="ts">
    let {
        ref = $bindable(null),
        value = $bindable(),
        class: className,
        size,
        ...restProps
    }: InputProps = $props();
</script>

<input bind:this={ref} bind:value {...restProps} class={[inputRecipe({ size: size }), className]} />
