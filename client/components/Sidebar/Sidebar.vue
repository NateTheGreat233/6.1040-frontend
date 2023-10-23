<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
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
const { exclusiveFriend } = storeToRefs(useExclusiveFriendStore());
const selectedTab = ref<string>();
const route = useRoute();

const onSignOut = async () => {
  await logoutUser();
  profileStore.resetStore();
  siteStore.resetStore();
  dualProfileStore.resetStore();
  exclusiveFriendStore.resetStore();
};

watchEffect(() => {
  if (route.name) {
    selectedTab.value = route.name.toString();
  }
});

const routeTo = (name: string) => {
  router.push({ name });
};
</script>

<template>
  <div class="container">
    <div class="content-container">
      <div class="top-buttons">
        <div>
          <DuetButton :text="'Relationship'" :width="'200px'" :height="'50px'" :onClick="() => routeTo('Relationship')" :selected="selectedTab === 'Relationship'" />
          <DuetButton
            :text="'Edit'"
            :width="'150px'"
            :height="'50px'"
            :onClick="() => routeTo('Edit Relationship')"
            :isDisabled="exclusiveFriend === undefined"
            :selected="selectedTab === 'Edit Relationship'"
          />
        </div>
        <div>
          <DuetButton :text="'My Posts'" :width="'200px'" :height="'50px'" :onClick="() => routeTo('My Posts')" :isDisabled="exclusiveFriend === undefined" :selected="selectedTab === 'My Posts'" />
        </div>
        <DuetButton :text="'Feed'" :width="'200px'" :height="'50px'" :onClick="() => routeTo('Feed')" :selected="selectedTab === 'Feed'" />
      </div>
      <DuetButton :text="'Sign Out'" :width="'200px'" :height="'50px'" :onClick="onSignOut" />
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
  gap: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: calc(100% - var(--nav-bar-height));
  min-width: var(--side-bar-width);
  max-width: var(--side-bar-width);
  border-width: 0px 1.5px 0px 0px;
  border-color: black;
  border-style: solid;
}
</style>
