import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./routes/router.js";
import "./main.scss";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
