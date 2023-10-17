<script setup lang="ts">
import { ref } from "vue";
import DuetButton from "../../components/DuetButton/DuetButton.vue";
import { useExclusiveFriendStore } from "../../stores/exclusiveFriend";

const username = ref("");
const { request } = useExclusiveFriendStore();
const requestExclusiveFriend = async () => {
    await request(username.value);
}

</script>

<template>
    <div class="create-relationship-container">
        <h1 class="large-text">Add Your Significant Other</h1>
        <h2 class="medium-text">Enter the username of your significant other to request them. They must do the same for you, too!</h2>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
        <DuetButton :text="'Request'" :onClick="requestExclusiveFriend"/>
    </div>
</template>

<style scoped>

.create-relationship-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

</style>
