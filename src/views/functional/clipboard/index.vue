<template>
  <el-card shadow="hover" class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ clipBoard.title }}</span>
      </div>
    </template>

    <el-input v-model="copyContent">
      <template #append>
        <el-button @click="copyText(copyContent)">{{ clipBoard.buttonVal }}</el-button>
      </template>
    </el-input>
    <el-input :placeholder="clipBoard.showVal" v-model="showContent" class="mt15"></el-input>
  </el-card>
</template>

<script setup lang="ts">
import {ref} from "vue";
import useLanguage from "@/hooks/useLanguage";

const {getMessage} = useLanguage();
const clipBoard = {
  title: "复制剪切演示",
  buttonVal: "点击复制",
  showVal: "点击上方 `复制` 按钮,然后 `Ctrl + V` 进行粘贴"
};
const copyContent = ref("http://localhost:300");
const showContent = ref("");
const copyText = (text: string) => {
  return new Promise((resolve, reject) => {
    try {
      navigator.clipboard.writeText(text);

      ElMessage({
        message: `${getMessage().message.layout.copyTextSuccess}`,
        type: "success"
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

</script>

<style scoped lang="scss">
.mt15 {
  margin-top: 10px;
}
</style>
