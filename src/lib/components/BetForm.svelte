<script lang="ts">
  import { _ } from "svelte-i18n";
  import { embedConfig } from "../stores/common";
  import { startTrigger } from "../stores/game";
  import type { IGameBetReq } from "../types/game";
  import { betGame } from "../services/game.service";

  let mode: "manual" | "auto" = "manual";
  let betAmount = 0;
  let difficulty = "hard";
  let totalProfit = $embedConfig.totalAmount ?? 0;
  let currencyLabel = $embedConfig.currency ?? "BTC";
  let loading = false;
  let message = "";

  async function submit() {
    loading = true;
    message = "";
    if (!$embedConfig?.currency) {
      return;
    }
    try {
      const req: IGameBetReq = {
        action: "play",
        bet_amount: 0.5,
        entity_wallet_code: $embedConfig.currency,
        tickets: [{ min: 500, max: 700 }],
      };
      const res = await betGame(req);
      console.log("RES bet:", res);
      // Demo call; replace /bet with real endpoint.
      // const res = await http.post<{ profit: number }>("/bet", {
      //   mode,
      //   betAmount,
      //   difficulty,
      // });
      // totalProfit = res.profit ?? 0;
      // message = $_("apiSuccess") as string;
      message = "Success" as string;
    } catch (error) {
      console.error(error);
      // message = $_("apiError") as string;
      message = "Error" as string;
    } finally {
      loading = false;
    }
  }

  function resetForm() {
    betAmount = 0;
    difficulty = "hard";
    totalProfit = 0;
    message = "";
  }

  function startGame() {
    $startTrigger += 1;
  }
</script>

<div class="card">
  <div class="tabs row">
    <button
      type="button"
      class={`tab ${mode === "manual" ? "active" : ""}`}
      on:click={() => (mode = "manual")}
    >
      Manual
    </button>
    <button
      type="button"
      class={`tab ${mode === "auto" ? "active" : ""}`}
      on:click={() => (mode = "auto")}
    >
      {$_("auto")}
    </button>
  </div>

  <div class="row">
    <div class="label">Amount</div>
    <input type="number" min="0" step="0.00000001" bind:value={betAmount} />
  </div>

  <div class="row">
    <div class="label">Difficulty</div>
    <select bind:value={difficulty}>
      <option value="hard">Hard</option>
    </select>
  </div>

  <div class="row">
    <button class="button green" on:click={submit} disabled={loading}>
      {loading ? "..." : $_("cashout")}
    </button>
  </div>

  <div class="row">
    <button class="button gray" on:click={() => (totalProfit += 1)}>
      Pump
      <!-- {$_("pump")} -->
    </button>
  </div>

  <div class="row footer">
    <!-- {$_("totalProfit", { values: { multiplier: "1.00" } })}: {totalProfit.toFixed(
      8
    )} -->
    {currencyLabel}
  </div>

  {#if message}
    <div class="message">{message}</div>
  {/if}

  <div class="row actions">
    <button class="button gray" on:click={submit} disabled={loading}>
      {$_("submit")}
    </button>
    <button class="button gray" on:click={resetForm}>
      {$_("reset")}
    </button>
    <button class="button green" type="button" on:click={startGame}>
      Start Game
    </button>
  </div>
</div>

<style>
  .card {
    background: #0f2233;
    padding: 16px;
    border-radius: 10px;
    color: #e8f1ff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  }
  .row {
    margin-bottom: 12px;
  }
  .tabs {
    display: flex;
    gap: 8px;
  }
  .tab {
    flex: 1;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    background: #0b1a29;
    border: 1px solid #1a3247;
    user-select: none;
  }
  .tab.active {
    background: #1e3b56;
    border-color: #28527a;
  }
  .label {
    font-size: 12px;
    margin-bottom: 6px;
    opacity: 0.9;
  }
  input,
  select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #20364c;
    background: #0d1b2b;
    color: #fff;
    font-size: 14px;
  }
  .button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
  }
  .button.green {
    background: #1aad4a;
    color: #fff;
  }
  .button.gray {
    background: #2c3f55;
    color: #fff;
  }
  .footer {
    font-size: 12px;
    opacity: 0.9;
  }
  .message {
    font-size: 12px;
    margin-top: 6px;
    color: #ffb347;
  }
  .actions {
    display: flex;
    gap: 8px;
  }
</style>
