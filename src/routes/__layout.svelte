<script lang="ts">
    // As this component is loaded everywhere, make Bootstrap styles available everywhere
    import { Styles } from "sveltestrap";
    import Header from "../components/header.svelte";
</script>

<Styles/>
<Header/>

<slot></slot>

<style>
    :global(body){
        user-select: none;
    }
</style>