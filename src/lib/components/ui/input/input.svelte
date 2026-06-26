<script lang="ts" module>
    import type { HTMLInputAttributes } from "svelte/elements";

    import { inputStyle, type InputVariants } from "./style";

    export interface InputProps extends Omit<HTMLInputAttributes, "size">, Partial<InputVariants> {
        ref?: HTMLInputElement | null;
    }
</script>

<script lang="ts">
    let {
        ref = $bindable(null),
        value = $bindable(),
        class: className,
        size = "md",
        ...restProps
    }: InputProps = $props();
</script>

<input
    bind:this={ref}
    bind:value
    {...restProps}
    class={[inputStyle({ variant: "outline", size: size }), className]}
/>
