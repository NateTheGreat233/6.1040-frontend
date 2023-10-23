<script setup lang="ts">
import { useExclusiveFriendStore } from "@/stores/exclusiveFriend";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import DuetButton from "../components/DuetButton/DuetButton.vue";
import AddScrapbook from "../components/Modal/AddScrapbook.vue";
import DeleteRelationship from "../components/Modal/DeleteRelationship.vue";
import router from "../router";
import { useDualProfileStore } from "../stores/dualProfile";
import { dateToInputValue } from "../utils/formatDate";

const { exclusiveFriend } = storeToRefs(useExclusiveFriendStore());
const { setIsDeletingRelationship } = useDualProfileStore();
const { updateDualProfile, setIsAddingScrapbookEntry } = useDualProfileStore();
const { startDate, scrapbook, isAddingScrapbookEntry, isDeletingRelationship } = storeToRefs(useDualProfileStore());
const changedDate = ref(startDate.value);

watchEffect(() => {
  if (exclusiveFriend.value === undefined) {
    router.push({ name: "Relationship" });
  }
});

watchEffect(() => {
  updateDualProfile(changedDate.value);
});

const deleteRelationship = async (): Promise<void> => {
  setIsDeletingRelationship(true);
};
</script>

<template>
  <main>
    <div class="edit-container">
      <div class="row top-row">
        <h1 class="large-text bold">Edit Relationship</h1>
        <div class="row gap">
          <DuetButton :text="'Delete Relationship'" :onClick="deleteRelationship" :width="'250px'" />
        </div>
      </div>
      <div class="row gap" style="margin-bottom: 20px">
        <h2>Relationship Start Date</h2>
        <input class="textField" v-model="changedDate" placeholder="YYYY-MM-DD" :max="dateToInputValue(new Date())" type="date" />
      </div>
      <div class="row gap" style="align-items: center; margin-bottom: 20px">
        <h2>Scrapbook</h2>
        <DuetButton :text="'Add Scrapbook Entry'" :onClick="() => setIsAddingScrapbookEntry(true)" :width="'250px'" :variant="'important'" />
      </div>
      <div class="scrapbook-container gap" :class="{ centered: scrapbook.length === 0 }">
        <h2 v-if="scrapbook.length === 0">Looks like you don't have anything in your scrapbook yet</h2>
        <div v-else v-for="entry in scrapbook" class="entry-container">
          <div class="entry-row">
            <div>
              <h4 style="margin: 0px">{{ dateToInputValue(new Date(entry.date)) }}</h4>
              <h4 style="margin: 0px">{{ entry.caption.length > 20 ? entry.caption.substring(0, 20) + "..." : entry.caption }}</h4>
            </div>
            <DuetButton :text="'Delete Entry'" :width="'150px'" :onClick="() => {}" :height="'50px'" />
          </div>
          <div style="width: 100%; max-height: 100%; display: flex">
            <img :src="entry.imageUrl" class="image" :ondragstart="(e: any) => e.preventDefault()" />
          </div>
        </div>
      </div>
    </div>
    <AddScrapbook v-if="isAddingScrapbookEntry" />
    <DeleteRelationship v-if="isDeletingRelationship" />
  </main>
</template>

<style scoped>
.top-row {
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.entry-row {
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  border-width: 0px;
  padding-bottom: 5px;
  box-sizing: border-box;
  border-bottom-width: 1px;
}

.entry-container {
  width: 500px;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  padding: 10px;
  max-height: 100%;
  min-height: 100%;
  align-items: space-between;
  justify-content: space-between;
  box-sizing: border-box;
}

.image {
  max-height: 100%;
  box-sizing: border-box;
  width: auto;
  overflow: hidden;
}

.centered {
  align-items: center;
  justify-content: center;
}

.scrapbook-container {
  display: flex;
  flex-direction: row;
  max-width: calc(100% - var(--page-side-padding));
  overflow-x: scroll;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  height: 100%;
  max-height: 100%;
  padding: 20px;
  margin-bottom: var(--page-side-padding);
  box-sizing: border-box;
}

.gap {
  gap: 20px;
}

.row {
  display: flex;
  flex-direction: row;
}
.edit-container {
  width: calc(100% - var(--page-side-padding) * 2);
  height: 100%;
  max-height: 100%;
  padding-right: var(--page-side-padding);
  padding-left: var(--page-side-padding);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
