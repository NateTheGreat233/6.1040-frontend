import { defineStore } from "pinia";
import { ref } from "vue";

export const useSiteStore = defineStore(
  "site",
  () => {
    const isLoggingIn = ref<boolean>(false);
    const isSigningUp = ref<boolean>(false);
    const modalVisible = ref<boolean>(false);

    const setIsLoggingIn = (val: boolean) => (isLoggingIn.value = val);
    const setIsSigningUp = (val: boolean) => (isSigningUp.value = val);
    const setModalVisible = (val: boolean) => (modalVisible.value = val);
    const resetStore = () => {
      isLoggingIn.value = false;
      isSigningUp.value = false;
      modalVisible.value = false;
    };

    return {
      isLoggingIn,
      isSigningUp,
      modalVisible,
      setModalVisible,
      setIsLoggingIn,
      setIsSigningUp,
      resetStore,
    };
  },
  { persist: true },
);
