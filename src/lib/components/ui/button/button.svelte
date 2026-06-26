<script lang="ts" module>
    import type { HTMLButtonAttributes } from "svelte/elements";

    import { button as buttonRecipe, type ButtonVariantProps } from "$styled-system/recipes";

    export interface ButtonProps extends HTMLButtonAttributes, ButtonVariantProps {
        ref?: HTMLButtonElement | null;
    }
</script>

<script lang="ts">
    let {
        class: className,
        ref = $bindable(null),
        type = "button",
        size,
        variant,
        disabled,
        children,
        ...restProps
    }: ButtonProps = $props();
</script>

<button
    data-slot="button"
    bind:this={ref}
    {type}
    {disabled}
    {...restProps}
    class={[buttonRecipe({ size, variant }), className]}
>
    {@render children?.()}
</button>
