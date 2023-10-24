<script setup lang="ts">
import DualProfile from "@/components/DualProfile/DualProfile.vue";
import CreateRelationship from "@/components/ExclusiveFriend/CreateRelationship.vue";
import Loading from "@/components/Loading/Loading.vue";
import { useExclusiveFriendStore } from "@/stores/exclusiveFriend";
import { storeToRefs } from "pinia";

const { fetchingExclusiveFriend, exclusiveFriend, requestedFriend, errorMsg } = storeToRefs(useExclusiveFriendStore());
</script>

<template>
  <div class="relationship-container">
    <Loading v-if="fetchingExclusiveFriend !== false && requestedFriend === undefined && errorMsg === undefined" :text="'Loading Your Relationship Details'" />
    <CreateRelationship v-else-if="exclusiveFriend === undefined" />
    <DualProfile v-else />
  </div>
</template>

<style scoped>
.relationship-container {
  width: calc(100% - var(--side-bar-width) - 5px);
  max-width: calc(100% - var(--side-bar-width) - 5px);
  height: 100%;
  max-height: 100%;
  padding-right: var(--page-side-padding);
  padding-left: var(--page-side-padding);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
