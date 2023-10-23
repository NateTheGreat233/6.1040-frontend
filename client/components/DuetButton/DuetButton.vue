<script setup lang="ts">
import { defineProps, ref, toRefs } from "vue";

const props = defineProps<{
  onClick: () => void;
  text: string;
  width?: string;
  height?: string;
  isDisabled?: boolean;
  variant?: "important" | "normal";
  selected?: boolean;
}>();

const { onClick, text, width, height, isDisabled, variant, selected } = toRefs(props);

const defaultWidth = "100px";
const defaultHeight = "50px";
const actualWidth = ref<string>(width?.value ?? defaultWidth);
const actualHeight = ref<string>(height?.value ?? defaultHeight);

const executeAction = () => {
  if (isDisabled.value) return;
  onClick.value();
};
</script>

<template>
  <div class="button-container" :class="{ disabled: isDisabled, important: variant === 'important', normal: variant === 'normal' || !variant, selected: selected }" v-on:click="executeAction">
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
  min-width: v-bind(actualWidth);
  max-width: v-bind(actualWidth);
  min-height: v-bind(actualHeight);
  max-height: v-bind(actualHeight);
  padding: 0px;
}

.button-container:hover {
  cursor: pointer;
}

.important {
  background-color: var(--red);
}

.important:hover {
  background-color: var(--dark-red);
}

.important:active {
  background-color: var(--darker-red);
}

.normal {
  background-color: white;
}

.normal:hover {
  background-color: rgb(232, 232, 232);
}

.normal:active {
  background-color: rgb(200, 200, 200);
}

.disabled {
  background-color: var(--disabled-color);
}

.disabled:hover {
  background-color: var(--disabled-color);
  cursor: initial;
}

.disabled:active {
  background-color: var(--disabled-color);
}

.selected {
  background-color: var(--lavender);
}

.selected:hover {
  background-color: var(--lavender);
}

.selected:active {
  background-color: var(--lavender);
}

.text {
  margin: 0px;
  user-select: none;
  text-align: center;
}
</style>
