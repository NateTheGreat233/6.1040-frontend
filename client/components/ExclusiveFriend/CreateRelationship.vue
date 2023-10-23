<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import DuetButton from "../../components/DuetButton/DuetButton.vue";
import { useExclusiveFriendStore } from "../../stores/exclusiveFriend";

const username = ref("");
const { requestedFriend, errorMsg } = storeToRefs(useExclusiveFriendStore());
const { request, removeRequest } = useExclusiveFriendStore();
const requestExclusiveFriend = async () => {
  const copy = username.value;
  username.value = "";
  await request(copy);
};

const remove = async () => {
  await removeRequest();
};
</script>

<template>
  <div class="create-relationship-container">
    <h1 class="large-text">Add Your Significant Other</h1>
    <h2 class="medium-text">
      In order to begin connecting with your significant other, you must add them first! Enter the username of your significant other to request them. They must do the same for you, too!
    </h2>
    <div v-if="requestedFriend === undefined" class="input-row">
      <input :disabled="requestedFriend !== undefined" v-model.trim="username" type="text" id="aligned-name" class="textField" placeholder="Username" required />
      <DuetButton :text="'Request'" :onClick="requestExclusiveFriend" :width="'150px'" :isDisabled="username.length === 0" :variant="'important'" />
    </div>
    <div v-else>
      <h2>
        You've sent a request to <span class="highlighted">{{ requestedFriend }}</span
        >. We are still waiting for <span class="highlighted">{{ requestedFriend }}</span> to add you back!
      </h2>
      <DuetButton :text="`Remove Request to ${requestedFriend}`" :onClick="remove" :width="'300px'" />
    </div>
    <h2 v-if="errorMsg !== undefined" class="error-color">{{ errorMsg }}</h2>
  </div>
</template>

<style scoped>
.create-relationship-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.highlighted {
  color: var(--darker-red);
}

.input-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
</style>
