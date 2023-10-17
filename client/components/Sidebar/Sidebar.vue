<script setup lang="ts">
import DuetButton from "../../components/DuetButton/DuetButton.vue";
import { useProfileStore } from "../../stores/profile";
import { useUserStore } from "../../stores/user";

const { logoutUser } = useUserStore();
const { resetStore } = useProfileStore();
// const { resetStore } = useExclusiveFriendStore();
// const { resetStore } = useSiteStore();

const onSignOut = () => {
    void logoutUser();
    // profileReset();
}

</script>

<template>
    <div class="container">
        <div class="content-container">
            <DuetButton :text="'Relationship'" :width="'150px'" :height="'50px'" :onClick="() => {}" />
            <DuetButton :text="'Create Post'" :width="'100px'" :height="'50px'" :onClick="() => {}" />
            <DuetButton :text="'Edit'" :width="'100px'" :height="'50px'" :onClick="() => {}" />
            <DuetButton :text="'Feed'" :width="'150px'" :height="'50px'" :onClick="() => {}" />
            <DuetButton :text="'Sign Out'" :width="'150px'" :height="'50px'" :onClick="onSignOut" />
        </div>
    </div>
</template>

<style scoped>

.content-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    min-height: calc(100% - var(--nav-bar-height));
    min-width: 200px;
    max-width: 200px;
    border-width: 0px 2px 0px 0px;
    border-color: black;
    border-style: solid;
}
</style>
