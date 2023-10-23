import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { BodyT, fetchy } from "@/utils/fetchy";
import { CometChat } from "@cometchat-pro/chat";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const resetStore = () => {
      currentUsername.value = "";
    };

    const createUser = async (name: string, username: string, password: string) => {
      await fetchy("/api/users", "POST", {
        body: { name, username, password },
      });
      const newCometChatUser = new CometChat.User(username);
      newCometChatUser.setName(name);
      await CometChat.createUser(newCometChatUser, import.meta.env.VITE_COMET_CHAT_API_KEY);
    };

    const loginUser = async (username: string, password: string) => {
      await fetchy("/api/login", "POST", {
        body: { username, password },
      });
      await CometChat.login(username, import.meta.env.VITE_COMET_CHAT_API_KEY);
    };

    const updateSession = async () => {
      try {
        const { username } = await fetchy("/api/session", "GET", { alert: false });
        await CometChat.login(username, import.meta.env.VITE_COMET_CHAT_API_KEY);
        currentUsername.value = username;
      } catch {
        currentUsername.value = "";
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST", { alert: false });
      resetStore();
    };

    const updateUser = async (patch: BodyT) => {
      await fetchy("/api/users", "PATCH", { body: { update: patch } });
    };

    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    return {
      currentUsername,
      isLoggedIn,
      createUser,
      loginUser,
      updateSession,
      logoutUser,
      updateUser,
      deleteUser,
    };
  },
  { persist: true },
);
