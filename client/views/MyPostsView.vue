<script setup lang="ts"></script>

<template>
  <main>
    <div class="container">
      <h1 class="large-text bold">My Posts</h1>
      <div class="content">
        <div class="posted-container">
          <h1 class="medium-text bold">Posted</h1>
        </div>
        <div class="approval-container">
          <h1 class="medium-text bold">For Approval</h1>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding-right: var(--page-side-padding);
  padding-left: var(--page-side-padding);
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
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
  width: 50%;
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
  width: 50%;
  height: 100%;
  border-style: solid;
  border-width: 0px;
  border-right-width: 1px;
}
</style>
