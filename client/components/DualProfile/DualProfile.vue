<script setup lang="ts">
import { CometChat } from "@cometchat-pro/chat";
import { storeToRefs } from "pinia";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useDualProfileStore } from "../../stores/dualProfile";
import { useExclusiveFriendStore } from "../../stores/exclusiveFriend";
import { useProfileStore } from "../../stores/profile";
import { useUserStore } from "../../stores/user";
import { dateToInputValue } from "../../utils/formatDate";
import ConversationPrompt from "../ConversationPrompt/ConversationPrompt.vue";
import DuetButton from "../DuetButton/DuetButton.vue";

const { name } = storeToRefs(useProfileStore());
const { startDate, scrapbook } = storeToRefs(useDualProfileStore());
const { currentUsername } = storeToRefs(useUserStore());
const { exclusiveFriend, exclusiveFriendUsername } = storeToRefs(useExclusiveFriendStore());
const exclusiveFriendOnline = ref<boolean>(false);
const hasIncomingCall = ref<boolean>(false);
const proposingCall = ref<boolean>(false);
const isInCall = ref<boolean>(false);
const currentCallId = ref<string>();
const dateString = computed(() => dateToTime(new Date(startDate.value)));

const generatePrompt = async (): Promise<void> => {};

const dateToTime = (date: Date): string => {
  const now = new Date();
  const yearDiff = now.getFullYear() - date.getFullYear();
  const monthDiff = now.getMonth() - date.getMonth();
  const dayDiff = now.getDate() - date.getDate();
  let out = "";
  if (yearDiff > 0) {
    out += `${yearDiff} years, `;
  }
  if (monthDiff > 0) {
    out += `${monthDiff} months, `;
  }
  out += `${dayDiff} days`;
  return out;
};

const startCall = async (call: any) => {
  isInCall.value = true;
  CometChat.startCall(
    call.getSessionId(),
    document.getElementById("video chat container") as HTMLElement,
    new CometChat.OngoingCallListener({
      onCallEnded: (call: any) => {
        isInCall.value = false;
      },
    }),
  );
};

const acceptCall = async () => {
  const call = await CometChat.acceptCall(currentCallId.value as string);
  startCall(call);
  hasIncomingCall.value = false;
};

const rejectCall = async () => {
  await CometChat.rejectCall(currentCallId.value as string, CometChat.CALL_STATUS.REJECTED);
  hasIncomingCall.value = false;
  isInCall.value = false;
};

const onIncomingCallReceived = (call: any) => {
  currentCallId.value = call.sessionId;
  hasIncomingCall.value = true;
};

const onOutgoingCallAccepted = (call: any) => {
  proposingCall.value = false;
  startCall(call);
};

const onOutgoingCallRejected = (call: any) => {
  proposingCall.value = false;
};

const onIncomingCallCanceled = (call: any) => {
  hasIncomingCall.value = false;
};

const onUserOnline = () => {
  console.log("partner online!");
};

const onUserOffline = () => {
  console.log("partner offline!");
};

onMounted(async () => {
  const exclusiveFriend = await CometChat.getUser(exclusiveFriendUsername.value);
  exclusiveFriendOnline.value = exclusiveFriend.getStatus() === "online";

  const currentCall = CometChat.getActiveCall();
  console.log(currentCall);

  CometChat.addCallListener(
    currentUsername.value,
    new CometChat.CallListener({
      onOutgoingCallAccepted,
      onOutgoingCallRejected,
      onIncomingCallReceived,
      onIncomingCallCanceled,
    }),
  );

  CometChat.addUserListener(
    exclusiveFriendUsername.value as string,
    new CometChat.UserListener({
      onUserOnline,
      onUserOffline,
    }),
  );
});

onUnmounted(() => {
  CometChat.removeCallListener(currentUsername.value);
  CometChat.removeUserListener(exclusiveFriendUsername.value as string);
});

const proposeCall = async (): Promise<void> => {
  const receivedID = exclusiveFriendUsername.value;
  const callType = CometChat.CALL_TYPE.VIDEO;
  const receivedType = CometChat.RECEIVER_TYPE.USER;
  const call = new CometChat.Call(receivedID, callType, receivedType);

  try {
    await CometChat.initiateCall(call);
    proposingCall.value = true;
  } catch (e: any) {
    console.log(`Couldn't start call. Error: ${Object.entries(e)}`);
  }
};

const cancelCall = async (): Promise<void> => {
  console.log("hitting");
  try {
    proposingCall.value = false;
    console.log("hello");
  } catch (e) {
    console.log("failed");
    console.log(e);
  }
};
</script>

<template>
  <div class="dual-profile-container">
    <div class="dual-profile-header">
      <div class="dual-profile-title gap">
        <h1 class="medium-text bold">{{ name }}</h1>
        <h1 class="medium-text bold">{{ " & " }}</h1>
        <h1 class="medium-text bold">{{ exclusiveFriend }}</h1>
      </div>
      <div class="time-container">
        <img src="../../assets/images/time.png" class="clock-img" />
        <h1>{{ dateString }}</h1>
      </div>
    </div>
    <div class="dual-profile-content">
      <div class="left-side gap">
        <div class="call-button-container">
          <DuetButton
            v-if="!isInCall"
            :text="proposingCall ? 'Cancel Call' : 'Start Video Call'"
            :onClick="proposingCall ? cancelCall : proposeCall"
            :width="'30%'"
            :isDisabled="hasIncomingCall"
            :variant="proposingCall ? 'normal' : 'important'"
          />
          <DuetButton v-if="!isInCall" :width="'30%'" :text="'Accept call'" :onClick="acceptCall" :isDisabled="!hasIncomingCall" :variant="'important'" />
          <DuetButton v-if="!isInCall" :width="'30%'" :text="'Reject call'" :onClick="rejectCall" :isDisabled="!hasIncomingCall" />
        </div>
        <ConversationPrompt v-if="isInCall" />
        <div id="video chat container" class="video-chat-container">
          <h1 v-if="!isInCall">{{ proposingCall ? `You are calling ${exclusiveFriend}!` : hasIncomingCall ? `${exclusiveFriend} is calling you!` : "No call detected" }}</h1>
        </div>
      </div>
      <div class="right-side">
        <h1 style="margin-bottom: 2px">Scrapbook</h1>
        <div class="scrapbook gap">
          <div v-for="(entry, ix) in scrapbook.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())" class="entry-container gap" :class="{ start: ix % 2 === 0, end: ix % 2 === 1 }">
            <div class="entry-content">
              <img :src="entry.imageUrl" :ondragstart="(e: Event) => e.preventDefault()" />
              <div class="row between">
                <h2>{{ dateToInputValue(new Date(entry.date)) }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.entry-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.start {
  justify-content: flex-start;
}

.end {
  justify-content: flex-end;
}

.entry-content {
  display: flex;
  max-width: 75%;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.between {
  justify-content: space-between;
  align-items: center;
}

.scrapbook {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: var(--red);
  background-image: url("../../assets/images/scrapbook-wallpaper.jpg");
}

.right-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 50%;
  width: 45%;
  height: calc(100% - 100px);
  max-height: calc(100% - 100px);
}

.left-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 50%;
  width: 50%;
  min-height: calc(100% - 100px);
  max-height: calc(100% - 100px);
}

.dual-profile-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  height: 100%;
}

.gap {
  gap: 10px;
}

.clock-img {
  width: 25px;
  height: 25px;
  margin-right: 20px;
}

.dual-profile-header {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.call-button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.video-chat-container {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  background-color: rgb(255, 246, 246);
}

.dual-profile-logo {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
}

.dual-profile-title {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.dual-profile-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding-bottom: 20px;
  box-sizing: border-box;
}
</style>
