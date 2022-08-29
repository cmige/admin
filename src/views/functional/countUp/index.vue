<template>
  <el-card shadow="hover" class="count-up-box">
    <template #header>
      <div class="card-header">
        <span>{{ countUp.title }}</span>
      </div>
    </template>
    <el-row gutter="15">
      <CountUpItem :isUseDefault="true"></CountUpItem>
    </el-row>
    <el-button>
      <el-icon>
        <Refresh/>
      </el-icon>
      {{ countUp.buttonVal }}
    </el-button>
  </el-card>
</template>

<script setup lang="ts">
import CountUpItem from "./countUpItem.vue";

const countUp = {
  title: "数字滚动演示",
  buttonVal: "重置"
};

</script>

<style scoped lang="scss">

</style>
