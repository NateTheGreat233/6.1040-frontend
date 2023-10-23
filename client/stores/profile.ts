import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchy } from "../utils/fetchy";

export const useProfileStore = defineStore(
  "profile",
  () => {
    const name = ref<string>("");
    const exclusiveFriendName = ref<string>("");

    const fetchProfile = async (username: string): Promise<void> => {
      const result = (await fetchy(`/api/profile/${username}`, "GET", { alert: false })).profile.name;
      name.value = result;
    };

    const resetStore = () => {
      name.value = "";
      exclusiveFriendName.value = "";
    };

    return {
      name,
      exclusiveFriendName,
      fetchProfile,
      resetStore,
    };
  },
  { persist: true },
);
