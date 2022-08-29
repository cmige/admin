import {getCurrentInstance, onBeforeMount, onMounted, onUnmounted, ref} from "vue";
type Result = { layout: string, clientWidth: number }

function useClientWidth() {
    const _clientWidth = ref(0);
    const instance = <any>getCurrentInstance();

    onBeforeMount(() => {
        initClientWidth(document.body.clientWidth);

    });

    onMounted(() => {
        instance.proxy.mittBus.on("mobileLayoutResize", (res: Result) => {
            initClientWidth(res.clientWidth);
        });
    });

    onUnmounted(() => {
        instance.proxy.mittBus.off("mobileLayoutResize", () => {
        });
    });

    const initClientWidth = (clientWidth: number) => {
        _clientWidth.value = clientWidth;
    };

    return {
        _clientWidth
    };
}


export default useClientWidth;