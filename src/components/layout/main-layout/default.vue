<template>
  <el-container class="xx-layout-container">
    <Aside/>

    <el-container direction="vertical">
      <!--    header fixed  -->
      <Header v-if="isFixedHeader"></Header>

      <el-main style="background-color: #f8f8f8">
        <el-scrollbar>
          <Header v-if="!isFixedHeader"></Header>
          <Main style="background-color: #f8f8f8"></Main>
          <el-footer>Footer</el-footer>
        </el-scrollbar>
      </el-main>


      <!--        <el-footer>Footer</el-footer>-->
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Aside from "@/components/layout/compnent/aside.vue";
import Header from "@/components/layout/compnent/header.vue";
import Main from "@/components/layout/compnent/main.vue";
import {useRouter} from "vue-router";
import {computed} from "vue";

import {useThemeConfig} from "@/store/themeConfig";
import {storeToRefs} from "pinia";

const store = useThemeConfig();
const {themeConfig} = storeToRefs(store);


const isFixedHeader = computed(() => {
  return themeConfig.value.isFixedHeader;
});
const router = useRouter();
const toPath = (path: string) => {
  router.push(path);
};


</script>

<style scoped lang="scss">

</style>
