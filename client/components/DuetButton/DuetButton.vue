<script setup lang="ts">
import { ref } from "vue";

const { onClick, text, width, height } = defineProps<{
    onClick: () => void;
    text: string;
    width?: string;
    height?: string;
}>();

const defaultWidth = '100px';
const defaultHeight = '50px';
const actualWidth = ref(width ?? defaultWidth);
const actualHeight = ref(height ?? defaultHeight);

function goHome() {
    onClick();
}

</script>

<template>
    <div class="button-container" @click="goHome">
        <h1 class="text bold small-text">{{ text }}</h1>
    </div>
</template>

<style scoped>

.button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 15px;
    width: v-bind(actualWidth);
    height: v-bind(actualHeight);
    padding: 0px;
    background-color: var(--red);
    cursor: pointer;
}

.container:hover {
    background-color: var(--dark-red);
}

.text {
    margin: 0px;
    text-align: center;
}
</style>
