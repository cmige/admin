import {createApp} from "vue";
import App from "./App.vue";
// import ElementPlus from 'element-plus'
import other from "@/utils/other";
import mitt from "mitt";
import router from "@/router/index";
import "@/style/index.scss";
import store from "@/store/index";

const app = createApp(App);
// 注册 icon
other.elIcon(app);

// evenBus
const Mit = mitt();
declare module "vue" {
    export interface ComponentCustomProperties {
        mittBus: typeof Mit;
    }
}

app.config.globalProperties.mittBus = Mit;
app.config.globalProperties.$ = Mit;

app
    .use(store)
    // .use(ElementPlus)
    .use(router)
    .mount("#app");






