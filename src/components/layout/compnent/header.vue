<template>
	<el-header class="xx-layout-header">
		<!--menuControl-->
		<el-row class="header-setting" justify="space-between">
			<el-col :span="4">
				<div class="header-menu-control">
					<el-icon @click="handleMenuCollapse">
						<Menu/>
					</el-icon>
					<div class="nav-menu-link" v-if="!(_clientWidth <= 760)">
						<el-link :underline="false">
							<el-icon class="el-icon--right">
								<icon-view/>
							</el-icon>
							<span>linkName</span>
						</el-link>
					</div>
				</div>
			</el-col>
			<!--setting-->
			<el-row justify="end">
				<div>
					<el-button text circle @click="showSearch">
						<el-icon :size="18">
							<Search/>
						</el-icon>
					</el-button>

					<el-dropdown @command="changeLanguage">
            <span class="el-dropdown-link">
              <el-button text circle>
                <el-icon :size="18"> <Connection/></el-icon>
              </el-button>
            </span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="zh-cn">简体中文</el-dropdown-item>
								<el-dropdown-item command="en">英文</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>

					<el-button text circle @click="handleSettingDrawer">
						<el-icon :size="18">
							<Tools/>
						</el-icon>
					</el-button>

					<el-dropdown>
						<div class="_dic" :style="{'display': 'flex','align-items': 'center'}">
							<div :style="{'width':'30px','height':'30px','borderRadio':'50%'}">
								<el-avatar :size="30"/>
							</div>
							<span style="margin: 0 5px">username</span>
							<el-icon>
								<ArrowDown/>
							</el-icon>
						</div>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>首页</el-dropdown-item>
								<el-dropdown-item>代码仓库</el-dropdown-item>
								<el-dropdown-item>个人中心</el-dropdown-item>
								<el-dropdown-item>退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</el-row>
		</el-row>

		<!--
					header navBar
					menuNavigation
		-->
		<div class="header-tab-menu" v-if="themeConfig.hasTagsView">
			<!-- tab-menu-style1 -->
			<el-tabs type="border-card" class="tab-menu" closable>
				<el-tab-pane>
					<template #label>
            <span class="custom-tabs-label">
              <el-icon><Menu/></el-icon>
              <span class="label-text">Route</span>
            </span>
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>
	</el-header>
</template>

<script setup lang="ts">

import {getCurrentInstance, onMounted,} from "vue";
import {ArrowDown, Connection, Menu, Search, Tools, View as IconView,} from "@element-plus/icons-vue";
import {useThemeConfig} from "@/store/themeConfig";
import useClientWidth from "@/hooks/useClientWidth";
import {storeToRefs} from "pinia";

const instance = <any>getCurrentInstance();
const {_clientWidth} = useClientWidth();
const themeConfigStore = useThemeConfig();
const {themeConfig} = storeToRefs(themeConfigStore);

const handleMenuCollapse = () => {

};
const handleSettingDrawer = () => {
	instance.proxy.mittBus.emit("showSettingDrawer");
};

onMounted(() => {
	console.log("header onMounted");
});

const changeLanguage = (locale: string) => {
	instance.proxy.mittBus.emit("getLanguage", locale);
};

const showSearch = () => {
	instance.proxy.mittBus.emit("showTeleport", true);
};


</script>

<style scoped lang="scss">

.header-tab-menu {
	width: 100%;
}
</style>

