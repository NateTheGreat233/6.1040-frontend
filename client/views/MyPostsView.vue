<script setup lang="ts">
import { storeToRefs } from "pinia";
import DuetButton from "../components/DuetButton/DuetButton.vue";
import CreatePost from "../components/Modal/CreatePost.vue";
import { useDualPostStore } from "../stores/dualPost";
import { dateToInputValue } from "../utils/formatDate";

const { isCreatingPost, forApproval, myApprovedPosts } = storeToRefs(useDualPostStore());
const { setIsCreatingPost, approvePost, rejectPost, deletePost } = useDualPostStore();

const createPost = async (): Promise<void> => {
  setIsCreatingPost(true);
};

const onApprove = async (postId: string): Promise<void> => {
  approvePost(postId);
};

const onReject = async (postId: string): Promise<void> => {
  rejectPost(postId);
};

const onDeletePost = async (postId: string): Promise<void> => {
  deletePost(postId);
};
</script>

<template>
  <main>
    <div class="container">
      <div class="top-row">
        <h1 class="large-text bold">My Posts</h1>
        <DuetButton :text="'Create Post'" :onClick="createPost" :variant="'important'" :width="'200px'" />
      </div>
      <div class="content">
        <div class="posted-container">
          <h1 class="medium-text bold">Posted</h1>
          <div v-for="post in myApprovedPosts" class="post">
            <img :src="post.imageUrl" class="img" />
            <div style="display: flex; flex-direction: column; width: 100%">
              <h2>{{ dateToInputValue(new Date(post.date)) }}</h2>
              <h2>{{ post.content }}</h2>
              <DuetButton :text="'Delete Post'" :onClick="() => onDeletePost(post._id)" />
            </div>
          </div>
        </div>
        <div class="approval-container">
          <h1 class="medium-text bold">For Approval</h1>
          <div v-for="post in forApproval" class="post">
            <img :src="post.imageUrl" class="img" />
            <div style="display: flex; flex-direction: column; width: 100%">
              <h2>{{ dateToInputValue(new Date(post.date)) }}</h2>
              <h2>{{ post.content }}</h2>
              <div style="display: flex; flex-direction: row; width: 100%; gap: 20px">
                <DuetButton :text="'Accept'" :variant="'important'" :onClick="() => onApprove(post._id)" />
                <DuetButton :text="'Reject'" :onClick="() => onReject(post._id)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreatePost v-if="isCreatingPost" />
  </main>
</template>

<style scoped>
.post {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  gap: 10px;
}
.container {
  padding-right: var(--page-side-padding);
  padding-left: var(--page-side-padding);
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
}

.img {
  width: 50%;
  margin-bottom: 10px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
}

.top-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.approval-container {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  border-style: solid;
  border-width: 0px;
  border-left-width: 1px;
  padding-left: 50px;
  box-sizing: border-box;
}

.posted-container {
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  border-style: solid;
  border-width: 0px;
  border-right-width: 1px;
}
</style>
