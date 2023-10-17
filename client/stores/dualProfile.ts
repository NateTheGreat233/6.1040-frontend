import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchy } from "../utils/fetchy";

export const useDualProfileStore = defineStore(
  "dualProfile",
  () => {
    const startDate = ref<Date>(new Date());

    const fetchDualProfile = async (): Promise<void> => {
      console.log("fetching");
      const response = await fetchy("/api/dualProfile", "GET", { alert: false });
      console.log(response);
    };

    return {
      startDate,
      fetchDualProfile,
    };
  },
  { persist: true },
);
