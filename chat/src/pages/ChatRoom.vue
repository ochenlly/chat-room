<template>
  <div id="chatRoom">
    <div class="exit" @click="exit">退出群聊</div>
    <div class="body">
      <div class="message">
        <div v-for="(item, index) in talkList" class="oneMessage">
          <div :style="{ 'align-self': item.type === 1 ? 'end' : 'start' }">
            <div class="username">
              {{ item.nickname }}
            </div>
            <div class="receive_Mesaage">
              {{ item.message }}
            </div>
            <div class="message_time">
              {{ item.time }}
            </div>
          </div>
        </div>
      </div>
      <div class="input">
        <input type="text" v-model="input" />
        <button @click="send">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { io } from "socket.io-client";
const socket = io("http://localhost:3020");

const route = useRoute();
const router = useRouter();
const nickname = ref(null);

//套接字是否连接到服务器
socket.on("connect", () => {
  console.log("已与服务器连接");
  socket.emit("sendName", nickname.value);
});
onMounted(() => {
  // console.log(route.query);
  nickname.value = route.query.nickname;
});
//接受服务端发来的消息（单播）
socket.on("hello", (data, callback) => {
  console.log(data);
  //   callback("got it");
});
socket.on("inform", (data) => {
  console.log(`${data}来了！`);
});
//组播
socket.on("an event", (data) => {
  console.log(data);
  talkList.value.push(data);
});

const input = ref();
const talkList = ref([]);
function getTime() {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return hours + ":" + minutes + ":" + seconds;
}
function send() {
  let time = getTime();
  console.log(input.value);
  talkList.value.push({
    type: 1,
    message: input.value,
    time,
    nickname: nickname.value,
  });
  socket.emit("sendinfor", {
    type: 1,
    message: input.value,
    time,
    nickname: nickname.value,
  });

  input.value = "";
}
//退出
function exit() {
  // socket.disconnect();
  socket.close();
  router.push("/login");
}
</script>

<style scoped lang="scss">
#chatRoom {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #eee;
  .exit {
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
  }
  .body {
    position: absolute;
    height: 80%;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .message {
      height: 90%;
      width: 100%;
      overflow-y: auto;
      background-color: white;
      .oneMessage {
        display: flex;
        flex-direction: column;
        .username {
          text-align: center;
          font-weight: bold;
          margin: 10px;
        }
        .receive_Mesaage {
          box-sizing: border-box;
          padding: 20px;
          margin: 10px;
          background-color: #efefef;
          border-radius: 20px;
          font-size: 20px;
        }
        .message_time {
          text-align: center;
        }
      }
    }
    .input {
      position: relative;
      width: 100%;
      height: 10%;
      background-color: pink;
      input {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        padding: 0 10px;
        background-color: white;
        font-size: 20px;
        border: solid 1px black;
      }
      button {
        position: absolute;
        right: 0px;
        height: 100%;
        width: 10%;
        // border-radius: 5px;
        background-color: #63b3ed;
        font-weight: bold;
        font-size: 15px;
      }
    }
  }
}
</style>
