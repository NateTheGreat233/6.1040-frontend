<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import DuetButton from "../DuetButton/DuetButton.vue";

const currentPrompt = ref<string | undefined>();
const loadingPrompt = ref<boolean>(false);

const getPrompt = async (): Promise<void> => {
  loadingPrompt.value = true;
  currentPrompt.value = undefined;
  currentPrompt.value = await fetchy("/api/prompt", "GET", {});
  loadingPrompt.value = false;
};
</script>

<template>
  <section class="prompt-container">
    <DuetButton :text="'Get Prompt'" :onClick="getPrompt" :width="'30%'" :disabled="loadingPrompt" :variant="'important'" />
    <div style="height: 60px; display: flex; flex-direction: row; align-items: center">
      <h1 v-if="!loadingPrompt" class="small-text">{{ currentPrompt ?? "Click Get Prompt to see some cool conversation prompts!" }}</h1>
      <h1 v-else class="small-text">Loading Prompt...</h1>
    </div>
  </section>
</template>

<style scoped>
h1 {
  margin: 0px;
}
.prompt-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
}
</style>
