import "@/assets/css/reset.css";
import "@/assets/css/style.css"

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import ViButton from "./components/ViButton.vue";

const app = createApp(App);

app.use(router);
app.component("vi-button", ViButton);

app.mount("#app");
