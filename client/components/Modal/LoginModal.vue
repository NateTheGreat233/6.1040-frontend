<script setup lang="ts">
import router from '@/router';
import { useSiteStore } from "@/stores/site";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const name = ref("");
const { loginUser, createUser, updateSession } = useUserStore();
const { setIsSigningUp, setIsLoggingIn } = useSiteStore();

async function login() {
    await loginUser(username.value, password.value);
    await updateSession();
    setIsLoggingIn(false);
    setIsSigningUp(false);
    router.push({ name: 'Relationship' });
}

async function signUp() {
    await createUser(username.value, password.value);
    await loginUser(username.value, password.value);
    void updateSession();
    setIsSigningUp(false);
    setIsLoggingIn(false);
}

function goBack() {
    setIsLoggingIn(false);
    setIsSigningUp(false);
}

</script>

<template>
    <div class="container">
        <div class="content">
            <h1>Login</h1>
            <button @click="goBack">Go Back</button>
            <fieldset>
                <div class="pure-control-group">
                    <label for="aligned-name">Username</label>
                    <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
                </div>
                <div class="pure-control-group">
                    <label for="aligned-password">Password</label>
                    <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
                </div>
                <div class="pure-controls" @click="login">
                    <button type="submit" class="pure-button pure-button-primary">Submit</button>
                </div>
            </fieldset>
            <fieldset>
                <div class="pure-control-group">
                    <label for="aligned-name">Name</label>
                    <input v-model.trim="name" type="text" id="aligned-name" placeholder="Name" required />
                </div>
                <div class="pure-control-group">
                    <label for="aligned-name">Username</label>
                    <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
                </div>
                <div class="pure-control-group">
                    <label for="aligned-password">Password</label>
                    <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
                </div>
                <div class="pure-controls" @click="signUp">
                    <button type="submit" class="pure-button pure-button-primary">Submit</button>
                </div>
            </fieldset>
        </div>
    </div>
</template>

<style scoped>

.container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 0%, 0.5);
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border-width: 2px;
    border-color: black;
    border-style: solid;
    width: 50%;
    height: 90%;
    background-color: white;
}

</style>
