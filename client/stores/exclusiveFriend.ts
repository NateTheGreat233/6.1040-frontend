import { fetchy } from "@/utils/fetchy";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExclusiveFriendStore = defineStore(
  "exclusiveFriend",
  () => {
    const exclusiveFriend = ref<string | undefined>();
    const exclusiveFriendUsername = ref<string | undefined>();
    const requestedFriend = ref<string | undefined>();
    const fetchingRequestedFriend = ref<boolean | undefined>();
    const fetchingExclusiveFriend = ref<boolean | undefined>();
    const errorMsg = ref<string | undefined>();

    const request = async (username: string): Promise<void> => {
      try {
        await fetchy(`/api/exclusiveFriend/request/${username}`, "POST", { alert: false });
        errorMsg.value = undefined;
      } catch (e) {
        errorMsg.value = (e as unknown as Error).message;
      }
      await fetchRequestedExclusiveFriend();
      await fetchExclusiveFriend();
    };

    const removeRequest = async (): Promise<void> => {
      try {
        await fetchy("/api/exclusiveFriend/request/remove", "DELETE", { alert: false });
        errorMsg.value = undefined;
      } catch (e) {
        errorMsg.value = (e as unknown as Error).message;
      }
      requestedFriend.value = undefined;
    };

    const fetchExclusiveFriend = async (): Promise<void> => {
      fetchingExclusiveFriend.value = true;
      try {
        const { username, name } = await fetchy(`/api/exclusiveFriend`, "GET", { alert: false });
        exclusiveFriend.value = name;
        exclusiveFriendUsername.value = username;
      } catch (e) {
        exclusiveFriend.value = undefined;
        exclusiveFriendUsername.value = undefined;
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

    const removeExclusiveFriend = async (): Promise<void> => {
      exclusiveFriend.value = undefined;
      await fetchy("/api/exclusiveFriend/remove", "DELETE", { alert: false });
    };

    const resetStore = () => {
      exclusiveFriend.value = "";
      requestedFriend.value = undefined;
      fetchingExclusiveFriend.value = undefined;
      fetchingRequestedFriend.value = undefined;
      exclusiveFriendUsername.value = undefined;
      errorMsg.value = undefined;
    };

    return {
      exclusiveFriend,
      exclusiveFriendUsername,
      requestedFriend,
      fetchingExclusiveFriend,
      fetchingRequestedFriend,
      errorMsg,
      removeExclusiveFriend,
      fetchExclusiveFriend,
      fetchRequestedExclusiveFriend,
      request,
      removeRequest,
      resetStore,
    };
  },
  { persist: true },
);
