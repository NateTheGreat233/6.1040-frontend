<script setup lang="ts">
import router from "@/router";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { CometChat } from "@cometchat-pro/chat";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar/Navbar.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import { useDualProfileStore } from "./stores/dualProfile";
import { useExclusiveFriendStore } from "./stores/exclusiveFriend";
import { useProfileStore } from "./stores/profile";
import { useSiteStore } from "./stores/site";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const siteStore = useSiteStore();
const { isLoggedIn, currentUsername } = storeToRefs(userStore);
const { modalVisible } = storeToRefs(siteStore);
const { fetchExclusiveFriend, fetchRequestedExclusiveFriend } = useExclusiveFriendStore();
const { fetchProfile } = useProfileStore();
const { fetchDualProfile } = useDualProfileStore();
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  initialize();
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in, that's fine
  }
});

// checks for login state and pushes to home when user logs in
watchEffect(() => {
  if (!isLoggedIn.value) {
    router.push({ name: "Home" });
  }
});

// makes the page unscrollable when a modal is open
watchEffect(() => {
  document.documentElement.style.overflowY = modalVisible.value ? "hidden" : "auto";
});

watchEffect(async () => {
  if (isLoggedIn.value) {
    const actionsToComplete = [
      CometChat.login("SUPERHERO1", import.meta.env.VITE_COMET_CHAT_API_KEY),
      fetchExclusiveFriend(),
      fetchRequestedExclusiveFriend(),
      fetchProfile(currentUsername.value),
      fetchDualProfile(),
    ];
    try {
      await Promise.all(actionsToComplete);
    } catch {}
  }
});

const initialize = () => {
  siteStore.setIsLoggingIn(false);
  siteStore.setIsSigningUp(false);

  const cometChatSettings: CometChat.AppSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion("US").autoEstablishSocketConnection(true).build();

  void CometChat.init(import.meta.env.VITE_COMET_CHAT_APP_ID, cometChatSettings);
};
</script>

<template>
  <header>
    <Navbar />
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <div class="page-layout">
    <Sidebar v-if="!['Home', 'not-found'].includes(currentRouteName?.toString() ?? '')" />
    <RouterView />
  </div>
</template>

<style scoped>
@import "./assets/toast.css";

@font-face {
  font-family: "DM Sans";
  src: url("./assets/fonts/DMSans.ttf");
}

.page-layout {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
}

h1 {
  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}
</style>
