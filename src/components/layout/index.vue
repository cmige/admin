<template>
	<component :is="activeComp"></component>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useThemeConfig} from "@/store/themeConfig";
import {computed, defineAsyncComponent, getCurrentInstance, onBeforeMount, onUnmounted} from "vue";


const defaultModel = defineAsyncComponent(() => import("@/components/layout/main-layout/default.vue"));
const classicModel = defineAsyncComponent(() => import("@/components/layout/main-layout/classic.vue"));
const columnsModel = defineAsyncComponent(() => import("@/components/layout/main-layout/columns.vue"));

const store = useThemeConfig();
const {themeConfig} = storeToRefs(store);
const instance = <any>getCurrentInstance();

const activeComp = computed((): any => {
	const temp = localStorage.getItem("preLayout") ?? themeConfig.value.layout;
	return temp === "default" ? defaultModel :
			themeConfig.value.layout === "classic" ? classicModel : columnsModel;
});

onBeforeMount(() => {
	resizeLayout();
	window.addEventListener("resize", resizeLayout);
});

onUnmounted(() => {
	window.removeEventListener("resize", resizeLayout);
});

const resizeLayout = () => {
	//
	if (!localStorage.getItem("preLayout")) localStorage.setItem("preLayout", themeConfig.value.layout);
	const clientWidth = document.body.clientWidth;
	if (clientWidth < 992) {
		// 不显示 aside, mobileModel
		themeConfig.value.isCollapse = true;
		instance.proxy.mittBus.emit("mobileLayoutResize", {
			layout: "default",
			clientWidth
		});
	} else {
		// 电脑版
		themeConfig.value.isCollapse = false;
		instance.proxy.mittBus.emit("mobileLayoutResize", {
			layout: themeConfig.value.layout,
			clientWidth
		});
	}

};

</script>

<style scoped lang="sass">

</style>
