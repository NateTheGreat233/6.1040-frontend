<script setup lang="ts">
import DuetButton from "../../components/DuetButton/DuetButton.vue";
import router from "../../router";
import { useDualProfileStore } from "../../stores/dualProfile";
import { useExclusiveFriendStore } from "../../stores/exclusiveFriend";
import { useProfileStore } from "../../stores/profile";
import { useSiteStore } from "../../stores/site";
import { useUserStore } from "../../stores/user";

const { logoutUser } = useUserStore();
const profileStore = useProfileStore();
const siteStore = useSiteStore();
const dualProfileStore = useDualProfileStore();
const exclusiveFriendStore = useExclusiveFriendStore();

const onSignOut = async () => {
  await logoutUser();
  profileStore.resetStore();
  siteStore.resetStore();
  dualProfileStore.resetStore();
  exclusiveFriendStore.resetStore();
};

const routeTo = (name: string) => {
  router.push({ name });
};
</script>

<template>
  <div class="container">
    <div class="content-container">
      <div class="top-buttons">
        <div>
          <DuetButton :text="'Relationship'" :width="'150px'" :height="'50px'" :onClick="() => routeTo('Relationship')" />
          <DuetButton :text="'Create Post'" :width="'100px'" :height="'50px'" :onClick="() => {}" />
          <DuetButton :text="'Edit'" :width="'100px'" :height="'50px'" :onClick="() => {}" />
        </div>
        <DuetButton :text="'Feed'" :width="'150px'" :height="'50px'" :onClick="() => routeTo('Feed')" />
      </div>
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
  padding: 25px 0px 25px 0px;
  height: 100%;
}

.top-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
