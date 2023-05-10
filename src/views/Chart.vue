<script setup>
import { useCounterStore } from "../app/store";

const { count } = useCounterStore();
</script>

<template>
  <main id="about-page">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>From Redux</p>
    <p>{{ count }}</p>
  </main>
</template>
