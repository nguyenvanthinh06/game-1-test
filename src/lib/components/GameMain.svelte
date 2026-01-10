<script lang="ts">
  import { Texture } from "pixi.js";
  import { Application, Text, Sprite, AssetsLoader } from "svelte-pixi";
  import { onMount, onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import pointPng from "../../assets/point.png?url";
  import Loading from "./Loading.svelte";
  import { startTrigger } from "../stores/game";
  import { observeElementSize } from "../utils";

  // const pointPng = new URL("../../assets/point.png", import.meta.url).href;

  const minX = 0;
  let maxX: number | undefined;
  let maxY: number | undefined;
  const radius = 60;
  let container: HTMLElement | null = null;

  let xPos = minX + radius;

  let lastTrigger = $startTrigger;
  let xCircle = tweened(xPos, {
    duration: 400,
    easing: cubicOut,
  });

  function start() {
    if (maxX && xPos > maxX - radius * 2) return;
    xPos += 100;
    xCircle.set(xPos);
  }

  $: if ($startTrigger !== lastTrigger) {
    lastTrigger = $startTrigger;
    console.log("startTrigger", $startTrigger);
    start();
  }

  let cleanupSize: (() => void) | null = null;

  onMount(() => {
    cleanupSize = observeElementSize(container, ({ width, height }) => {
      maxX = width;
      maxY = height;
    });
  });

  onDestroy(() => {
    cleanupSize?.();
  });
</script>

<div bind:this={container} style="width: 100%; height: 100%; display: flex;">
  {#if maxX && maxY}
    <Application
      antialias
      width={maxX ?? 0}
      height={maxY ?? 0}
      background="black"
    >
      <Text
        x={maxX ? maxX / 2 : 0}
        y={200}
        anchor={0.5}
        text={`${maxX}px ${$xCircle.toFixed(2)}px`}
        style={{ fill: "white" }}
      />

      <AssetsLoader assets={[pointPng]}>
        <Sprite
          x={$xCircle}
          y={500}
          texture={Texture.from(pointPng)}
          anchor={0.5}
          width={40}
          height={50}
        />
      </AssetsLoader>
    </Application>
  {:else}
    <Loading />
  {/if}
</div>
