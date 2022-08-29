<template>
  <div class="layout-search-dialog">
    <el-dialog
        v-model="state.visible"
        fullscreen
        width="300px"
    >
      <el-autocomplete
          v-model="state1"
          :fetch-suggestions="querySearch"
          class="inline-input w-50"
          placeholder="Menu Search"
          @select="handleSelect"
          :teleported="false"
      >
        <template #prefix>
          <el-icon style="vertical-align: middle">
            <Search/>
          </el-icon>
        </template>
      </el-autocomplete>
      >
    </el-dialog>
  </div>


</template>

<script setup lang="ts">

import {Search} from "@element-plus/icons-vue";
import {getCurrentInstance, onMounted, onUnmounted, reactive, ref} from "vue";

const state = reactive({
  visible: false,
  searchVal: ""
});
const state1 = ref("");

interface RestaurantItem {
  value: string;
  link: string;
}

const restaurants = ref<RestaurantItem[]>([]);
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value;
  // call callback function to return suggestions
  cb(results);
};
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

const handleSelect = (item: RestaurantItem) => {
  console.log(item);
};

const loadAll = () => {
  return [
    {value: "vue", link: "https://github.com/vuejs/vue"},
    {value: "element", link: "https://github.com/ElemeFE/element"},
    {value: "cooking", link: "https://github.com/ElemeFE/cooking"},
    {value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui"},
    {value: "vuex", link: "https://github.com/vuejs/vuex"},
    {value: "vue-router", link: "https://github.com/vuejs/vue-router"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
    {value: "babel", link: "https://github.com/babel/babel"},
  ];
};

onMounted(() => {
  restaurants.value = loadAll();
});

const instance = <any>getCurrentInstance();
onMounted(() => {
  instance.proxy.mittBus.on("showTeleport", (visible: boolean) => {
    state.visible = visible;
  });
});
onUnmounted(() => {
  instance.proxy.mittBus.on("showTeleport", () => {
  });
});
</script>

<style scoped lang="scss">
.layout-search-dialog {
  ::v-deep(.el-dialog) {
    background-color: rgba(0, 0, 0, 0.4);
  }

  ::v-deep(.el-autocomplete) {
    width: 600px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

