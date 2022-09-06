<template>

	<el-row class="xx-aside" :style="{'width': themeConfig.isCollapse?0:'200px'}">
		<el-aside>
			<el-scrollbar class="scroll">
				<Menu></Menu>
			</el-scrollbar>
		</el-aside>
	</el-row>


</template>

<script setup lang="ts">
import {computed, getCurrentInstance, onBeforeMount, reactive} from "vue";
import {storeToRefs} from "pinia";
import {useThemeConfig} from "@/store/themeConfig";
import Menu from "@/components/menu/vertical.vue";


const instance = <any>getCurrentInstance();
const state = reactive({
	clientWidth: 0,
	showAside: true
});

const store = useThemeConfig();
const {themeConfig} = storeToRefs(store);

onBeforeMount(() => {
	initMenuWidth(document.body.clientWidth);
	instance.proxy.mittBus.on("mobileLayoutResize", (result: { layout: string, clientWidth: number }) => {
		initMenuWidth(result.clientWidth);
	});
});


const calcAsideStyle = computed(() => {
	const {layout, isCollapse} = themeConfig.value;
	if (state.clientWidth < 992) {
		state.showAside = false;
		// 手机端
		if (isCollapse) {

		}
	} else {
		state.showAside = true;
		if (layout === "columns") {

		} else {
			if (isCollapse) return ["aside-layout-pc-60", "aside"];
			else return ["aside-layout-pc-200", "aside"];
		}
	}

});


const initMenuWidth = (clientWidth: number) => {
	state.clientWidth = clientWidth;
};
</script>

<style scoped lang="scss">

.xx-aside {
	height: 100%;
	overflow: hidden;
	transition: 0.3s ease;

	::v-deep(.el-aside) {
		width: unset;
		height: 100%;
		transition: width 1s ease;
	}
}

.aside-warp {
	height: 100%;
	overflow: hidden;

	width: inherit;

	.aside {
		width: unset;
		min-width: 60px;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;

		.scroll {
			flex: 1;
			overflow: auto;
		}
	}
}

.aside-layout-pc-60 {
	width: 60px;
	transition: width 0.3s ease;
}

.aside-layout-pc-200 {
	min-width: 200px;
	transition: width 0.3s ease;
}
</style>
