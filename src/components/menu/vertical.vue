<template>
	<!-- static router -->
	<el-menu
			class="xx-menu"
			:collapse="themeConfig.isCollapse"
	>
		<el-sub-menu index="1" v-for="i in 20" :key="i">
			<template #title>
				<el-icon>
					<location/>
				</el-icon>
				<span>Navigator One --- {{ i }}</span>
			</template>
		</el-sub-menu>
	</el-menu>
</template>

<script setup lang="ts">
import {useThemeConfig} from "@/store/themeConfig";
import {storeToRefs} from "pinia";

const store = useThemeConfig();
const {themeConfig} = storeToRefs(store);

</script>

<style scoped lang="scss">
.xx-menu:not(.el-menu--collapse) {
	width: 215px;

}
</style>
