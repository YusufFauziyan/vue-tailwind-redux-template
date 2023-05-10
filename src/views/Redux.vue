<script setup>
import { useCounterStore } from "../app/store"

const store = useCounterStore()
</script>

<template>
    <div>
        <h1>Redux</h1>
        <p>{{ store.count }}</p>
        <div class="flex gap-2 items-center">
            <button @click="store.increment">+</button>
            <button @click="store.decrement">-</button>
        </div>
    </div>
</template>