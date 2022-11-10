import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   proxy: {
  //     // Proxying websockets or socket.io
  //     "/socket.io": {
  //       target: "http://localhost:3020",
  //       ws: true,
  //     },
  //   },
  // },
});
