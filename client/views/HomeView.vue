<script setup lang="ts">
import DuetButton from "@/components/DuetButton/DuetButton.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
import LoginModal from "../components/Modal/LoginModal.vue";
import SignUpModal from "../components/Modal/SignUpModal.vue";
import router from "../router";
import { useSiteStore } from "../stores/site";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

const siteStore = useSiteStore();

const signUp = (): void => {
  siteStore.setIsSigningUp(true);
};

watchEffect(() => {
  if (isLoggedIn) {
    router.push({ name: "Relationship" });
  }
});
</script>

<template>
  <main>
    <div class="container">
      <div class="left-container">
        <h1 class="title bold huge-text">Stay Connected</h1>
        <h2 class="medium-text blurb">
          Duet is built for long distance couples. Going beyond video calling, Duet allows you and your significant other to connect on a deeper level through a virtual scrapbook, fun conversation
          prompts, and the ability to share important milestones with the world!
        </h2>
        <h2 class="medium-text">Start your Duet today!</h2>
        <DuetButton :text="'Get Started'" :onClick="signUp" :width="'200px'" :height="'60px'" />
      </div>
      <div class="right-container">
        <img class="front-image" src="@/assets/images/homepage.png" draggable="false" />
      </div>
    </div>
    <div v-if="siteStore.isLoggingIn">
      <LoginModal />
    </div>
    <div v-else-if="siteStore.isSigningUp">
      <SignUpModal />
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-left: var(--page-side-padding);
  padding-right: var(--page-side-padding);
  box-sizing: border-box;
  padding-top: 35px;
}

.blurb {
  line-height: 125%;
}

main {
  display: flex;
  width: 100%;
  height: 100%;
}

.title {
  margin: 0px;
}

.left-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 70%;
  max-height: 100%;
  padding: 0px 50px 50px 50px;
}

.right-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 30%;
}

.front-image {
  width: clamp(75%, 75%, 800px);
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
  border-color: black;
  aspect-ratio: 1;
}
</style>
