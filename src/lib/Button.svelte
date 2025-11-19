<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { css, cx, type Styles } from "../../styled-system/css";

	interface ButtonProps extends HTMLButtonAttributes {
		cssStyles?: Styles | Styles[];
	}

	const { children, cssStyles, class: className, type, ...props }: ButtonProps = $props();
</script>

<button
	{...props}
	type={type ? type : "button"}
	class={[
		cx(
			css(
				{
					rounded: "md",
					bgColor: "gray.100",
					py: "2",
					px: "4",
					cursor: "pointer",
					_hover: { bgColor: "gray.200" }
				},
				cssStyles
			)
		),
		className
	]}>{@render children?.()}</button
>
