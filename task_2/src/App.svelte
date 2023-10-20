<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import Form from "./lib/Form.svelte"
  import Translate from "./lib/Translate.svelte";

  async function convertCurrency() {
    const {data}= await axios.get('https://open.er-api.com/v6/latest/USD')
    return Object.keys(data.rates)
  }

  const сurrencyById = (id: string) => axios.get(`https://open.er-api.com/v6/latest/${id}`)

  type Currency = {
    base_code: string;
    rates: Record<string, string>;
  };

  let currencies: string[] = [];
  let inputCurrency: Currency | null = null;
  let outputCurrency: string | null = null;
  let loading = true;

  onMount(async () => {
    currencies = await convertCurrency();
    loading = false;
  });

  const changeSelected = async (event: { detail: { id: string } }) => {
    const { data } = await сurrencyById(event.detail.id);
    inputCurrency = data;
  };
</script>

<main class="items-center h-screen p-5">
  {#if loading}
    <div class="text-center mb-30 mt-16">Загрузка...</div>
  {:else}
    <header class="text-center mb-30 mt-16">
      <h1 class="text-3xl font-bold">Конвертер валют</h1>
    </header>

    <div class=" flex  flex-row text-center mb-8">
      <div class="w-1/2 inline-block">
        <Form
          title="У меня есть"
          {currencies}
          on:selectCurrency={changeSelected}
        />
      </div>
      <div class="w-1/2 inline-block">
        <Form
          title="Хочу получить"
          {currencies}
          on:selectCurrency={(event) => (outputCurrency = event.detail.id)}
        />
      </div>
    </div>

    <div class="text-center text-2xl font-bold mb-4">
      {inputCurrency?.base_code ?? "У меня есть"} → {outputCurrency ?? "Хочу получить"}
    </div>

    {#if outputCurrency && inputCurrency}
      <div class="text-center text-2xl mb-4">
        <Translate currency={outputCurrency} rates={inputCurrency.rates} />
      </div>
    {/if}
  {/if}
</main>

<style>
</style>
