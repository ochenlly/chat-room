<script setup>
import { ref, onMounted } from "vue";
// import vueSocketIo from "vue-socket.io";
// import SocketIO from "socket.io-client";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:3020");

const count = ref(0);

defineProps({
  msg: String,
});

// const socketOptions = {
//   autoConnect: true, // 自动连接
// };
// //套接字是否连接到服务器
// socket.on("connect", () => {
//   console.log("已与服务器连接");
// });
// //接受服务端发来的消息
// socket.on("hello", (data, callback) => {
//   console.log(data);
//   callback("got it");
// });

// socket.on("an event", (data) => {
//   console.log(data);
// });

onMounted(() => {});

function add() {
  count.value++;
  // socket.emit("sendinfor", {
  //   id: 3,
  //   value: "client send message",
  // });
  //主动断开连接
  // socket.io.disconnect();
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="add">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
