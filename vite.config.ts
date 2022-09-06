import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

import {resolve} from "path";

export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
            }
        },
        server: {
            port: env.VITE_PORT,
            open: false,
            proxy: {
                "/api": {
                    target: "http://localhost:5000",
                    changeOrigin: true,
                    ws: false,
                    // 后台接口需要以 api 开头，不需要重写
                    // rewrite: (path) => path.replace(/^\/api/, ''),
                },
            }
        }
    };
});

