<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let currencies: string[];
  export let title: string;

  const dispatch = createEventDispatcher();
  let value = "";

  function select(currency: string) {
    dispatch("selectCurrency", {
      id: currency,
    });
  }
</script>

<div>
  <span class="form-label">{title}</span>
  <select
    class="form-select-lg mb-3 bg-secondary bg-gradient text-white"
    bind:value
    on:change={() => select(value)}
  >
    {#each currencies as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
</div>
