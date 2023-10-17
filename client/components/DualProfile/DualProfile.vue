<script setup lang="ts">
import { CometChat } from "@cometchat-pro/chat";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useDualProfileStore } from "../../stores/dualProfile";
import { useProfileStore } from "../../stores/profile";
import ConversationPrompt from "../ConversationPrompt/ConversationPrompt.vue";
import DuetButton from "../DuetButton/DuetButton.vue";

const  { name } = storeToRefs(useProfileStore());
const { startDate } = storeToRefs(useDualProfileStore());
const dateString = computed(() => dateToTime(startDate.value));

const generatePrompt = async (): Promise<void> => {

}

const dateToTime = (date: Date): string => {
    const now = new Date();
    const yearDiff = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();
    const dayDiff = now.getDate() - date.getDate();
    let out = '';
    if (yearDiff > 0) {
        out += `${yearDiff} years, `;
    }
    if (monthDiff > 0) {
        out += `${monthDiff} months, `;
    }
    out += `${dayDiff} days`;
    return out;
}

const startCall = async (): Promise<void> => {

    const receivedID = 'sfdsdf';
    const callType = CometChat.CALL_TYPE.VIDEO;
    const receivedType = CometChat.RECEIVER_TYPE.USER;
    const call = new CometChat.Call(receivedID, callType, receivedType);

    try {
        const result = await CometChat.initiateCall(call);
    } catch (e) {
        console.log(`Couldn't start call. Error: ${e}`);
    }  
}

</script>

<template>
    <div class="dual-profile-container">
        <div class="dual-profile-header">
            <div class="dual-profile-title">
                <h1 class="large-text">{{ name }}</h1>
                <img src="../../assets/images/dualProfileLogo.png" class="dual-profile-logo" />
                <h1 class="large-text">{{ name }}</h1>
            </div>
            <div class="time-container">
                <img src="../../assets/images/time.png" class="clock-img" />
                <h1>{{ dateString }}</h1>
            </div>
            
        </div>
        <!-- <CometChatUI /> -->
        <div id="video chat container" class="video-chat-container"></div>
        <div class="call-button-container">
            <DuetButton :text="'Start Call'" :onClick="startCall" />
        </div>
        <ConversationPrompt />
    </div>
</template>

<style scoped>

.time-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.clock-img {
    width: 25px;
    height: 25px;
    margin-right: 20px;
}

.dual-profile-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.call-button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.video-chat-container {
    width: 400px;
    height: 400px;
    background-color: lightgray;
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
}

</style>
