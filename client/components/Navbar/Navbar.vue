<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSiteStore } from "../../stores/site";
import { useUserStore } from "../../stores/user";
import DuetButton from "../../components/DuetButton/DuetButton.vue";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const siteStore = useSiteStore();
const { isLoggedIn } = storeToRefs(userStore);

const goToLogin = () => {
  siteStore.setIsLoggingIn(true);
}
</script>

<template>
    <nav>
        <div class="title">
            <img src="@/assets/images/logo.png" class="logo" />
            <h1>Duet</h1>
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
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
}

</style>
