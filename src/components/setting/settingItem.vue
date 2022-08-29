<template>
  <el-row justify="space-between" align="middle">
    <span>{{ props.title }}</span>
    <el-color-picker v-model="themeConfig[settingToThemeStoreMap[props.valueName]]" v-if="props.itemType === PickerType"
                     :size="props.size?props.size:`small`"
                     @change="(v)=>handleChangeVal(props.itemType,props.valueName,v)"/>
    <el-switch v-model="themeConfig[settingToThemeStoreMap[props.valueName]]" v-else-if="props.itemType === SwitchType "
               :size="props.size?props.size:`small`" @change="(v)=>handleChangeVal(props.itemType,props.valueName,v)"/>
    <el-input-number v-else-if="props.itemType === InputNumberType" controls-position="right"
                     :size="props.size?props.size:`small`"/>
  </el-row>

</template>

<script setup lang="ts">
import {SettingItemType, settingToThemeStoreMap} from "@/components/setting/interface";
import {useThemeConfig} from "@/store/themeConfig";
import {storeToRefs} from "pinia";

const store = useThemeConfig();
const {themeConfig} = storeToRefs(store);

type Props = {
  title: string,
  itemType: number,
  valueName?: string
  size?: string
}
const PickerType = SettingItemType.Picker;
const SwitchType = SettingItemType.Switch;
const InputNumberType = SettingItemType.InputNumber;
const props = defineProps<Props>();


const handleChangeVal = (type: number, value: string, v?: any) => {
  switch (type) {
    case SwitchType:
      changeSwitchVal(value, v);
      break;
    case PickerType:
      changePickerVal(value, v);
      break;
    default:
      console.warn("this operation is not in the design range ");
  }
};
const changeSwitchVal = (name: string, v: any) => {
  console.log(name, v);
};

const changePickerVal = (name: string, v: any) => {
  console.log(name, v);
};


</script>

<style scoped lang="scss">

</style>
