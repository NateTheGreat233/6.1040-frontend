<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useDualProfileStore } from "../../stores/dualProfile";
import { useExclusiveFriendStore } from "../../stores/exclusiveFriend";
import DuetButton from "../DuetButton/DuetButton.vue";

const { setIsDeletingRelationship } = useDualProfileStore();
const { removeExclusiveFriend } = useExclusiveFriendStore();
const { exclusiveFriend } = storeToRefs(useExclusiveFriendStore());
const userInput = ref<string>("");

const goBack = () => {
  setIsDeletingRelationship(false);
};

const onDelete = async () => {
  try {
    await removeExclusiveFriend();
  } catch (e) {}
};
</script>

<template>
  <div class="modal-container" @click="goBack">
    <div class="content" v-on:click.stop>
      <h1 class="large-text" style="margin: 0px">Delete Relationship</h1>
      <div class="delete-container">
        <h2>
          Are you sure you want to delete your relationship with {{ exclusiveFriend }}? <span class="highlighted">This action cannot be reversed.</span> All of your posts and scrapbook entries will be
          gone.
        </h2>
        <h2 style="align-self: flex-start">If so, please type <span class="highlighted">delete relationship</span> below.</h2>
        <input class="textField" v-model="userInput" placeholder="delete relationship" />
      </div>
      <div class="row gap">
        <DuetButton :text="'Go Back'" :variant="'normal'" :onClick="goBack" :width="'200px'" />
        <DuetButton :text="'Delete'" :variant="'important'" :onClick="onDelete" :width="'200px'" :isDisabled="userInput !== 'delete relationship'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlighted {
  color: var(--darker-red);
}

.delete-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  flex-direction: row;
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
