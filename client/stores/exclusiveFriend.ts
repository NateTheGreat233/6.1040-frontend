import { fetchy } from "@/utils/fetchy";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExclusiveFriendStore = defineStore(
  "exclusiveFriend",
  () => {
    const exclusiveFriend = ref<string>();
    const fetchingExclusiveFriend = ref<boolean>(false);

    const request = async (username: string): Promise<void> => {
      await fetchy(`/api/exclusiveFriend/request/${username}`, "POST", {});
    };

    const fetchExclusiveFriend = async (): Promise<void> => {
      fetchingExclusiveFriend.value = true;
      try {
        exclusiveFriend.value = await fetchy(`/api/exclusiveFriend`, "GET", { alert: false });
      } catch (e) {
        exclusiveFriend.value = undefined;
      }
      fetchingExclusiveFriend.value = false;
    };

    const resetStore = () => {
      exclusiveFriend.value = "";
    };

    return {
      exclusiveFriend,
      fetchingExclusiveFriend,
      fetchExclusiveFriend,
      request,
      resetStore,
    };
  },
  { persist: true },
);
