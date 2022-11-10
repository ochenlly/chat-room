<template>
  <div class="login">
    <div class="content">
      <p>请输入你的昵称</p>
      <input type="text" v-model="nickname" />
      <button @click="intoRoom">进入聊天室</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const nickname = ref("");
function intoRoom() {
  console.log(nickname.value);
  if (nickname.value === "") alert("用户名不能为空");
  router.push({
    path: "/room",
    query: {
      nickname: nickname.value,
    },
  });
}
</script>

<style scoped lang="scss">
.login {
  position: absolute;
  height: 400px;
  width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #efefef;
  text-align: center;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      font-size: 20px;
      margin-bottom: 20px;
    }
    input {
      background: white;
      padding: 5px;
      height: 40px;
      width: 300px;
      font-size: 20px;
    }
    button {
      background-color: #409eff;
      width: 90px;
      height: 40px;
      margin-top: 20px;
      &:hover {
        background-color: #0c82f8;
      }
    }
  }
}
</style>
