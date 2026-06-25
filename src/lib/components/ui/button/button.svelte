<script lang="ts" module>
    import type { HTMLButtonAttributes } from "svelte/elements";

    import { buttonStyle, type ButtonVariants } from "./style";

    export interface ButtonProps extends HTMLButtonAttributes, Partial<ButtonVariants> {}
</script>

<script lang="ts">
    let {
        class: className,
        type = "button",
        size = "xl",
        visual = "solid",
        disabled,
        children,
        ...restProps
    }: ButtonProps = $props();
</script>

<button
    data-slot="button"
    {type}
    {disabled}
    {...restProps}
    class={[buttonStyle({ size, visual }), className]}
>
    {@render children?.()}
</button>
