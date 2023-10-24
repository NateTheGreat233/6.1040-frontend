<script setup lang="ts">
import { useDualPostStore } from "../stores/dualPost";
import { dateToInputValue } from "../utils/formatDate";

const { allPosts } = useDualPostStore();
</script>

<template>
  <div class="container">
    <h1 class="large-text bold">All Posts</h1>
    <div class="scroll-container">
      <div v-for="post in allPosts" class="post">
        <div style="width: 100%; height: calc(100% - 50px)">
          <img :src="post.imageUrl" :ondragstart="(e: any) => e.preventDefault()" class="img" />
        </div>
        <div style="display: flex; flex-direction: row; width: 100%; justify-content: space-between"></div>
        <h2 style="margin: 0px">{{ dateToInputValue(new Date(post.date)) }}</h2>
        <h2 style="margin: 0px">{{ post.content }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  gap: 50px;
  overflow-y: scroll;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
}

.img {
  object-fit: cover;
  height: 100%;
  border-radius: 10px;
}
.container {
  padding-right: var(--page-side-padding);
  padding-left: var(--page-side-padding);
  width: 100%;
  max-height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
}

.post {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: clamp(100px, 50% - 50px, 400px);
  height: 300px;
  border-style: solid;
  border-radius: 10px;
  padding: 5px;
  box-sizing: border-box;
}
</style>
