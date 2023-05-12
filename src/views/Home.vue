<script setup>
import { useCounterStore } from "../app/store";

const store = useCounterStore();
</script>

<template>
  <main id="Home-page">
    <h1>Home</h1>
    <p>{{ store.count }}</p>
    <div class="flex gap-4 items-center">
      <button @click="store.increment">+</button>
      <button @click="store.decrement">-</button>
    </div>
  </main>
</template>
