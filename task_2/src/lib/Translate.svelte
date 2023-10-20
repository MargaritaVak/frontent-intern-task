<script lang="ts">
  export let currency: string;
  export let rates: Record<string, string>;

  let inputValue = "";
  let outputValue = "";

  const calcCurrency = () => {
    if (!inputValue) return;
    outputValue = `${+inputValue * +rates[currency]}`;
  };
</script>

<form>
  <div class="mb-3 d-flex justify-content-center">
    <input
      class="form-select-lg mb-3 "
      bind:value={inputValue}
      on:input={calcCurrency}
      placeholder="Введите сумму"
    />
    <span class="m-2 d-block"> → </span>
    <input
      class="form-select-lg mb-3  "
      bind:value={outputValue}
      placeholder="Сумма будет такая"
    />
  </div>
</form>
