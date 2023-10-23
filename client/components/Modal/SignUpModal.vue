<script setup lang="ts">
import { useSiteStore } from "@/stores/site";
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";
import router from "../../router";
import DuetButton from "../DuetButton/DuetButton.vue";

const username = ref("");
const password = ref("");
const name = ref("");
const { loginUser, createUser, updateSession } = useUserStore();
const { setIsSigningUp, setIsLoggingIn } = useSiteStore();

const signUp = async () => {
  await createUser(name.value, username.value, password.value);
  await loginUser(username.value, password.value);
  await updateSession();
  setIsSigningUp(false);
  setIsLoggingIn(false);
  router.push({ name: "Relationship" });
};

const isDisabled = computed(() => ![username, password].every((ref) => ref.value.length > 0));

function goBack() {
  setIsLoggingIn(false);
  setIsSigningUp(false);
}
</script>

<template>
  <div class="modal-container" @click="goBack">
    <div class="content" v-on:click.stop>
      <h1 class="large-text">Get Started</h1>
      <div class="input-container">
        <input v-model.trim="name" class="textField" type="text" placeholder="Name" />
        <input v-model.trim="username" class="textField" type="text" placeholder="Username" />
        <input type="password" class="textField" v-model.trim="password" placeholder="Password" />
      </div>
      <DuetButton :text="'Sign Up'" :width="'200px'" :onClick="signUp" :isDisabled="isDisabled" :variant="'important'" />
    </div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
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
  box-sizing: border-box;
  padding: 10px 0px 50px 0px;
  width: 50%;
  height: 90%;
  min-width: 400px;
  min-height: 480px;
  background-color: white;
}
</style>
