<template>
  <div class="main-container">
    <router-view v-slot="{Component, route}">
      <keep-alive :include="[]">
        <component :is="Component" :key="route.name"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import "animate.css";</script>

<style scoped lang="scss">
.main-container {
  padding: 20px;
}

</style>
