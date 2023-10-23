<script setup lang="ts">
import router from "@/router";
import { useSiteStore } from "@/stores/site";
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";
import DuetButton from "../DuetButton/DuetButton.vue";

const username = ref("");
const password = ref("");
const { loginUser, updateSession } = useUserStore();
const { setIsSigningUp, setIsLoggingIn } = useSiteStore();

async function login() {
  await loginUser(username.value, password.value);
  await updateSession();
  setIsLoggingIn(false);
  setIsSigningUp(false);
  router.push({ name: "Relationship" });
}

function goBack() {
  setIsLoggingIn(false);
  setIsSigningUp(false);
}

const isDisabled = computed(() => ![username, password].every((ref) => ref.value.length > 0));
</script>

<template>
  <div class="modal-container" @click="goBack">
    <div class="content" v-on:click.stop>
      <h1 class="large-text">Login</h1>
      <div class="column">
        <input v-model.trim="username" type="text" class="textField" id="aligned-name" placeholder="Username" required />
        <input type="password" v-model.trim="password" class="textField" id="aligned-password" placeholder="Password" required />
      </div>
      <DuetButton :text="'Login'" :width="'200px'" :onClick="login" :isDisabled="isDisabled" :variant="'important'" />
    </div>
  </div>
</template>

<style scoped>
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
  padding: 10px 0px 50px 0px;
  background-color: white;
}
</style>
