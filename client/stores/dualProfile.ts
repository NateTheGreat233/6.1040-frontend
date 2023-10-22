import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchy } from "../utils/fetchy";

export const useDualProfileStore = defineStore(
  "dualProfile",
  () => {
    const startDate = ref<Date>(new Date());

    const fetchDualProfile = async (): Promise<void> => {
      const response = await fetchy("/api/dualProfile", "GET", { alert: false });
    };

    const resetStore = (): void => {};

    return {
      startDate,
      fetchDualProfile,
      resetStore,
    };
  },
  { persist: true },
);
