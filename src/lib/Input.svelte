<script lang="ts">
	import { css, type Styles } from "../../styled-system/css";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface InputProps extends HTMLInputAttributes {
		cssStyles?: Styles | Styles[];
	}

	const { cssStyles, class: className, ...props }: InputProps = $props();
</script>

<input
	{...props}
	class={[css({ bgColor: "white", fontSize: "xl", py: 1, px: 4 }, cssStyles), className]}
/>
