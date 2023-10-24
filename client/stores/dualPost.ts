import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchy } from "../utils/fetchy";

export const useDualPostStore = defineStore(
  "dualPost",
  () => {
    type Post = {
      imageUrl: string;
      _id: string;
      content: string;
      date: string;
    };

    const isCreatingPost = ref<boolean>(false);
    const forApproval = ref<Array<Post>>([]);
    const allPosts = ref<Array<Post>>([]);
    const myApprovedPosts = ref<Array<Post>>([]);

    const setIsCreatingPost = (val: boolean): void => {
      isCreatingPost.value = val;
    };

    const resetStore = (): void => {
      isCreatingPost.value = false;
      forApproval.value = [];
    };

    const proposePost = async (caption: string, image: { buffer: string; mimeType: string }): Promise<void> => {
      await fetchy("/api/post", "POST", {
        body: {
          content: caption,
          image: { buffer: image.buffer, mimeType: image.mimeType },
        },
      });
    };

    const deletePost = async (postId: string) => {
      await fetchy(`/api/post/delete/${postId}`, "DELETE", {});
      await fetchPersonalPosts();
      await fetchAllPosts();
    };

    const approvePost = async (postId: string) => {
      await fetchy(`/api/post/approve/${postId}`, "PUT", {});
      await fetchPersonalPosts();
      await fetchAllPosts();
    };

    const rejectPost = async (postId: string) => {
      await fetchy(`/api/post/deny/${postId}`, "DELETE", {});
      await fetchPersonalPosts();
    };

    const fetchPersonalPosts = async (): Promise<void> => {
      const myId = (await fetchy("/api/session", "GET", {}))._id;
      const response = await fetchy("/api/post/personal", "GET", {});
      const posts = response.posts as Array<any>;
      forApproval.value = posts.filter((post: any) => post.approver.toString() === myId.toString() && !post.approved);
      myApprovedPosts.value = posts.filter((post: any) => post.approved && [post.approver.toString(), post.proposer.toString()].includes(myId.toString()));
    };

    const fetchAllPosts = async (): Promise<void> => {
      const posts = (await fetchy(`/api/post/${10}`, "GET", {})) as Array<any>;
      allPosts.value = posts;
    };

    return {
      isCreatingPost,
      forApproval,
      myApprovedPosts,
      allPosts,
      deletePost,
      approvePost,
      rejectPost,
      fetchPersonalPosts,
      fetchAllPosts,
      setIsCreatingPost,
      proposePost,
      resetStore,
    };
  },
  { persist: true },
);
