import { fetchy } from "@/utils/fetchy";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExclusiveFriendStore = defineStore(
  "exclusiveFriend",
  () => {
    const exclusiveFriend = ref<string | undefined>();
    const requestedFriend = ref<string | undefined>();
    const fetchingRequestedFriend = ref<boolean | undefined>();
    const fetchingExclusiveFriend = ref<boolean | undefined>();

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

    const fetchRequestedExclusiveFriend = async (): Promise<void> => {
      fetchingRequestedFriend.value = true;
      try {
        requestedFriend.value = await fetchy("/api/exclusiveFriend/requested", "GET", { alert: false });
      } catch (e) {
        requestedFriend.value = undefined;
      }
      fetchingRequestedFriend.value = false;
    };

    const resetStore = () => {
      exclusiveFriend.value = "";
      requestedFriend.value = undefined;
      fetchingExclusiveFriend.value = undefined;
    };

    return {
      exclusiveFriend,
      fetchingExclusiveFriend,
      fetchingRequestedFriend,
      fetchExclusiveFriend,
      fetchRequestedExclusiveFriend,
      request,
      resetStore,
    };
  },
  { persist: true },
);
