<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import DuetButton from "../../components/DuetButton/DuetButton.vue";
import { useExclusiveFriendStore } from "../../stores/exclusiveFriend";

const username = ref("");
const { request, requestedFriend } = storeToRefs(useExclusiveFriendStore());
const requestExclusiveFriend = async () => {
  await request(username.value);
};
</script>

<template>
  <div class="create-relationship-container">
    <h1 class="large-text">Add Your Significant Other</h1>
    <h2 class="medium-text">
      In order to begin connecting with your significant other, you must add them first! Enter the username of your significant other to request them. They must do the same for you, too!
    </h2>
    <div class="input-row">
      <input v-model.trim="username" type="text" id="aligned-name" class="textField" placeholder="Username" required />
      <DuetButton :text="'Request'" :onClick="requestExclusiveFriend" :width="'150px'" :isDisabled="username.length === 0" />
      <h2 v-if="requestedFriend !== undefined">{{ requestedFriend }}</h2>
    </div>
  </div>
</template>

<style scoped>
.create-relationship-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.input-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
</style>
