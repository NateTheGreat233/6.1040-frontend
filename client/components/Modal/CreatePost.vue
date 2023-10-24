<script setup lang="ts">
import { computed, ref } from "vue";
import { useDualPostStore } from "../../stores/dualPost";
import DuetButton from "../DuetButton/DuetButton.vue";

const { proposePost, setIsCreatingPost } = useDualPostStore();
const caption = ref<string>();
const imageBuffer = ref<string>();
const mimeType = ref<string>();

const goBack = () => {
  setIsCreatingPost(false);
};

const onSubmit = async () => {
  await proposePost(caption.value as string, { buffer: imageBuffer.value as string, mimeType: mimeType.value as string });
  goBack();
};

const isDisabled = computed(() => {
  return [imageBuffer, mimeType, caption].some((ref) => ref.value === undefined || ref.value === "");
});

const handleChangeFile = async (e: any) => {
  if (e.target) {
    const file = e.target.files[0] as File;
    mimeType.value = file.type;
    imageBuffer.value = JSON.stringify(new Uint8Array(await file.arrayBuffer()));
  }
};
</script>

<template>
  <div class="modal-container" @click="goBack">
    <div class="content" v-on:click.stop>
      <h1 class="large-text" style="margin: 0px; margin-bottom: 20px">Create Post</h1>
      <h2 class="medium-text" style="margin: 0px">Note that your significant other must approve the post before it is officially posted.</h2>
      <div class="field-container">
        <div class="row gap">
          <h2>Caption</h2>
          <input type="text" v-model="caption" class="textField" placeholder="Add a caption here" />
        </div>
        <div class="row gap">
          <h2>Image</h2>
          <input type="file" @change="handleChangeFile" accept="image/*" />
        </div>
      </div>
      <div class="row gap">
        <DuetButton :text="'Go Back'" :variant="'normal'" :onClick="goBack" :width="'200px'" />
        <DuetButton :text="'Submit'" :variant="'important'" :onClick="onSubmit" :width="'200px'" :isDisabled="isDisabled" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.field-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-top: 50px;
}

.gap {
  gap: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border-width: 2px;
  border-color: black;
  border-style: solid;
  width: 50%;
  height: 90%;
  box-sizing: border-box;
  padding: 50px;
  background-color: white;
}
</style>
