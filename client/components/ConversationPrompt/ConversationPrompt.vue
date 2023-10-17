<script setup lang="ts">
import { ref } from 'vue';
import { fetchy } from '../../utils/fetchy';
import DuetButton from '../DuetButton/DuetButton.vue';

const currentPrompt = ref<string | undefined>();
const loadingPrompt = ref<boolean>(false);

const getPrompt = async (): Promise<void> => {
    loadingPrompt.value = true;
    currentPrompt.value = undefined;
    currentPrompt.value = await fetchy("/api/prompt", "GET", {});
    loadingPrompt.value = false;
}
</script>

<template>
    <section class="prompt-container">
        <DuetButton 
            :text="'Get Prompt'"
            :onClick="getPrompt"
        />
        <h1 v-if="currentPrompt !== undefined">{{ currentPrompt }}</h1>
        <h1 v-else-if="loadingPrompt">Loading Prompt...</h1>
    </section>
</template>

<style scoped>
.prompt-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
