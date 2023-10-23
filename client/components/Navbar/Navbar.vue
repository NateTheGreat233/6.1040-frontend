<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import DuetButton from "../../components/DuetButton/DuetButton.vue";
import { useSiteStore } from "../../stores/site";
import { useUserStore } from "../../stores/user";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const siteStore = useSiteStore();
const { isLoggedIn } = storeToRefs(userStore);
const pageScrolled = ref<boolean>(false);

const goToLogin = () => {
  siteStore.setIsLoggingIn(true);
};

const handleScroll = () => {
  pageScrolled.value = window.scrollY >= 5;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav v-bind:style="pageScrolled.valueOf() ? 'border-bottom-width: 2px' : 'border-bottom-width: 0px'">
    <div class="title">
      <img src="@/assets/images/logo.png" class="logo" draggable="false" />
      <h1 class="larg-text bold">Duet</h1>
    </div>
    <DuetButton v-if="!isLoggedIn" :text="'Login'" :onClick="goToLogin" :width="'200px'" :height="'50px'" />
  </nav>
  <div class="spaceholder"></div>
</template>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
  align-self: center;
  margin-right: 20px;
}

.spaceholder {
  position: static;
  width: 100%;
  height: var(--nav-bar-height);
}

.title {
  display: flex;
  flex-direction: row;
}

nav {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: var(--nav-bar-height);
  width: 100%;
  top: 0px;
  margin: 0px;
  padding-right: var(--page-side-padding);
  padding-left: var(--page-side-padding);

  /* from  https://stackoverflow.com/questions/779434/how-do-i-prevent-the-padding-property-from-changing-width-or-height-in-css */
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

  border-color: black;
  border-style: solid;
  border-width: 0px;
}
</style>
