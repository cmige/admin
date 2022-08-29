<template>
  <!-- setting -->
  <el-drawer
      v-model=" getThemeConfig.showSettingDrawer"
      :title="getSettingLang.settingTitle"
      direction="rtl"
      size="250px"
      destroy-on-close
      @close="handleClose"
      custom-class="setting-drawer"
  >
    <el-scrollbar>
      <div class="content-wrap">
        <!-- 全局主题 -->
        <el-divider content-position="left">{{ getSettingLang.settingTheme }}</el-divider>
        <SettingItem :title="getSettingLang.primary" :itemType="SettingItemType.Picker"
                     :valueName="SettingPropertiesObj.primary"></SettingItem>
        <SettingItem :title="getSettingLang.darkModel" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.darkModel"></SettingItem>

        <!-- 顶栏设置 -->
        <el-divider content-position="left">{{ getSettingLang.topBarSet }}</el-divider>
        <SettingItem :title="getSettingLang.topBarBgc" :itemType="SettingItemType.Picker"
                     :valueName="SettingPropertiesObj.topBarBgc"></SettingItem>
        <SettingItem :title="getSettingLang.topBarFontColor" :itemType="SettingItemType.Picker"
                     :valueName="SettingPropertiesObj.topBarFontColor"></SettingItem>

        <!-- 菜单设置 -->
        <el-divider content-position="left">{{ getSettingLang.menuSet }}</el-divider>
        <SettingItem :title="getSettingLang.menuBgc" :itemType="SettingItemType.Picker"
                     :valueName="SettingPropertiesObj.menuBgc"></SettingItem>
        <SettingItem :title="getSettingLang.menuFontColor" :itemType="SettingItemType.Picker"
                     :valueName="SettingPropertiesObj.menuFontColor"></SettingItem>

        <!-- 分栏设置 -->
        <el-divider content-position="left">{{ getSettingLang.columMenuSet }}</el-divider>
        <SettingItem :title="getSettingLang.columMenuBgc" :itemType="SettingItemType.Picker"
                     :valueName="SettingPropertiesObj.columMenuBgc"></SettingItem>
        <SettingItem :title="getSettingLang.columMenuFontColor" :itemType="SettingItemType.Picker"
                     :valueName="SettingPropertiesObj.columMenuFontColor"></SettingItem>

        <!-- 界面设置 -->
        <el-divider content-position="left">{{ getSettingLang.interfaceSet }}</el-divider>
        <SettingItem :title="getSettingLang.menuHorizontalCollapse" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.menuHorizontalCollapse"></SettingItem>
        <SettingItem :title="getSettingLang.menuAccordion" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.menuAccordion"></SettingItem>
        <SettingItem :title="getSettingLang.fixHeader" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.fixHeader"></SettingItem>
        <SettingItem :title="getSettingLang.openLockScreen" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.openLockScreen"></SettingItem>
        <SettingItem :title="getSettingLang.screenLocking" :itemType="SettingItemType.InputNumber"
                     :valueName="SettingPropertiesObj.screenLocking"></SettingItem>

        <!-- 界面显示 -->
        <el-divider content-position="left">{{ getSettingLang.interfaceDisplay }}</el-divider>
        <SettingItem :title="getSettingLang.sideBarLogo" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.sideBarLogo"></SettingItem>
        <SettingItem :title="getSettingLang.openBreadcrumb" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.openBreadcrumb"></SettingItem>
        <SettingItem :title="getSettingLang.openBreadcrumbIcon" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.openBreadcrumbIcon"></SettingItem>
        <SettingItem :title="getSettingLang.openTagsView" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.openTagsView"></SettingItem>
        <SettingItem :title="getSettingLang.openTagsViewIcon" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.openTagsViewIcon"></SettingItem>
        <SettingItem :title="getSettingLang.enableTagsViewCache" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.enableTagsViewCache"></SettingItem>
        <SettingItem :title="getSettingLang.openFooter" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.openFooter"></SettingItem>

        <!-- 其它设置 -->
        <el-divider content-position="left">{{ getSettingLang.otherSet }}</el-divider>
        <SettingItem :title="getSettingLang.tagsViewStyle" :itemType="SettingItemType.Switch"
                     :valueName="SettingPropertiesObj.tagsViewStyle"></SettingItem>

        <!-- 布局切换 -->
        <el-divider content-position="left">{{ getSettingLang.layoutSet }}</el-divider>
        <SettingItem :title="getSettingLang.layoutSet" :itemType="SettingItemType.Switch"
                     valueName="layoutSet"></SettingItem>

      </div>
    </el-scrollbar>
  </el-drawer>
</template>

<script setup lang="ts">
import {computed, reactive} from "vue";
import useLanguage from "@/hooks/useLanguage";
import {useThemeConfig} from "@/store/themeConfig";
import {storeToRefs} from "pinia";
import SettingItem from "./settingItem.vue";
import {SettingItemType, SettingPropertiesObj} from "@/components/setting/interface";

//
const state = reactive({
  appendToBody: true,
  visible: true,
  direction: "rtl",
  showClose: false,
  size: "unset",
  title: "",
  withHeader: true,
  hashMask: true,
  MaskClassName: "",
  zIndex: 0
});
const store = useThemeConfig();
const {themeConfig} = storeToRefs(store);
const {getMessage} = useLanguage();

const getSettingLang = computed(() => {
  return getMessage().message.settingDrawer;
});

const getThemeConfig = computed(() => {
  return themeConfig.value;
});
const openSettingDrawer = () => {
  getThemeConfig.value.showSettingDrawer = true;
};

const handleClose = () => {

};


defineExpose({
  openSettingDrawer
});
</script>

<style scoped lang="scss">

</style>
