const app = require("express")();

const useRouter = require("./router/index");

const http = require("http").Server(app);

const { Server } = require("socket.io");

var io = new Server(http, {
  //配置cors，解决同源策略问题
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(socket);
  // socket.data.username = "alice";
  console.log("a user connected");
  // socket.emit("hello", "我接收到了你发送的数据");
  // socket.emit("hello", "world", (response) => {
  //   console.log(response);
  // });

  //接收客户端的消息
  socket.on("sendinfor", (data) => {
    console.log(data);
    //发送给除了自身正在连接的
    socket.broadcast.emit("an event", {
      type: 2,
      message: data.message,
      time: data.time,
      nickname: socket.data.nickname,
    }); // everyone gets it but the sender
  });
  socket.on("sendName", (data) => {
    socket.data.nickname = data;
    socket.broadcast.emit("inform", socket.data.nickname);
  });
  //检测用户是否离开
  socket.on("disconnect", (socket) => {
    console.log("用户已离开");
  });
});

app.use(useRouter);

// socket.io必须要用http来监听端口
http.listen(3020, () => {
  console.log("listening on 3020");
});
