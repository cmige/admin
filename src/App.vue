<template>
  <el-config-provider :locale="getMessage()">
    <router-view/>
    <SettingDrawer ref="settingRef"/>
    <SearchCom/>
  </el-config-provider>
</template>

<script setup lang="ts">
import SettingDrawer from "@/components/setting/index.vue";
import "animate.css";
import {getCurrentInstance, onMounted, onUnmounted, ref,} from "vue";

import SearchCom from "@/components/search/search.vue";
import useLanguage from "@/hooks/useLanguage";

const settingRef = ref<any>();
const instance = <any>getCurrentInstance();
const {getMessage} = useLanguage();
onMounted(() => {
  // setting drawer
  instance.proxy.mittBus.on("showSettingDrawer", () => setSettingDrawer());
});

onUnmounted(() => {
  instance.proxy.mittBus.off("showSettingDrawer", () => {
  });
});

const setSettingDrawer = () => {
  settingRef.value.openSettingDrawer();
};

</script>


<style scoped lang="scss">
</style>
