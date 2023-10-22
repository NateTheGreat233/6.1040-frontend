<script setup lang="ts">
import DualProfile from "@/components/DualProfile/DualProfile.vue";
import CreateRelationship from "@/components/ExclusiveFriend/CreateRelationship.vue";
import Loading from "@/components/Loading/Loading.vue";
import { useExclusiveFriendStore } from "@/stores/exclusiveFriend";
import { storeToRefs } from "pinia";

const { fetchingExclusiveFriend, exclusiveFriend } = storeToRefs(useExclusiveFriendStore());
</script>

<template>
  <main>
    <div class="relationship-container">
      <Loading v-if="fetchingExclusiveFriend !== false" :text="'Loading Your Relationship Details'" />
      <CreateRelationship v-else-if="exclusiveFriend === undefined" />
      <DualProfile v-else />
    </div>
  </main>
</template>

<style scoped>
.relationship-container {
  width: calc(100% - var(--page-side-padding) * 2);
  height: 100%;
  max-height: 100%;
  padding-right: var(--page-side-padding);
  padding-left: var(--page-side-padding);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
