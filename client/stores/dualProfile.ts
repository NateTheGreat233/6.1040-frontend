import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchy } from "../utils/fetchy";
import { dateToInputValue } from "../utils/formatDate";

export const useDualProfileStore = defineStore(
  "dualProfile",
  () => {
    const startDate = ref<string>(dateToInputValue(new Date()));
    const scrapbook = ref<Array<any>>([]);
    const isAddingScrapbookEntry = ref<boolean>(false);
    const isDeletingRelationship = ref<boolean>(false);

    const setIsAddingScrapbookEntry = (value: boolean) => {
      isAddingScrapbookEntry.value = value;
    };

    const setIsDeletingRelationship = (value: boolean) => {
      isDeletingRelationship.value = value;
    };

    const addToScrapbook = async (date: Date, caption: string, image: { buffer: string; mimeType: string }) => {
      await fetchy("/api/dualProfile/update/scrapbook", "POST", {
        body: {
          caption,
          date,
          image,
        },
      });

      await fetchDualProfile();
    };

    const updateDualProfile = async (newDate: string) => {
      startDate.value = newDate;
      await fetchy("/api/dualProfile/update/time", "POST", {
        body: {
          time: new Date(newDate),
        },
      });
    };

    const fetchDualProfile = async (): Promise<void> => {
      const response = await fetchy("/api/dualProfile", "GET", { alert: false });
      startDate.value = dateToInputValue(new Date(Date.parse(response.dualProfile.startedAt)));
      scrapbook.value = response.dualProfile.scrapbook;
    };

    const deleteScrapbookEntry = async (id: string): Promise<void> => {
      await fetchy(`/api/dualProfile/scrapbook/delete/${id}`, "DELETE", {});
      await fetchDualProfile();
    };

    const resetStore = (): void => {
      startDate.value = dateToInputValue(new Date());
      scrapbook.value = [];
      isAddingScrapbookEntry.value = false;
      isDeletingRelationship.value = false;
    };

    return {
      startDate,
      scrapbook,
      isAddingScrapbookEntry,
      isDeletingRelationship,
      deleteScrapbookEntry,
      fetchDualProfile,
      resetStore,
      addToScrapbook,
      updateDualProfile,
      setIsAddingScrapbookEntry,
      setIsDeletingRelationship,
    };
  },
  { persist: true },
);
