<script lang="ts" module>
    import type { HTMLButtonAttributes } from "svelte/elements";

    import { buttonStyle, type ButtonVariants } from "./style";

    export interface ButtonProps extends HTMLButtonAttributes, Partial<ButtonVariants> {
        ref?: HTMLButtonElement | null;
    }
</script>

<script lang="ts">
    let {
        class: className,
        ref = $bindable(null),
        type = "button",
        size = "md",
        variant = "solid",
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
    class={[buttonStyle({ size, variant }), className]}
>
    {@render children?.()}
</button>
