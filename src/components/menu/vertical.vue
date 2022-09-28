<template>
  <!-- static router -->
  <el-menu
      class="xx-menu"
      :collapse="themeConfig.isCollapse"
  >
    <template v-for="(item,index) in state.menuList" :key="item.path">

      <el-menu-item :index="`${index+1}`" v-if="!item.children" @click="routeTo(item.path)">
        <el-icon>
          <location/>
        </el-icon>
        <template #title>{{ getLanguage("menu")[item.meta.title] }}</template>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu v-else :index="`${index+1}`">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>{{ getLanguage("menu")[item.meta.title] }}</span>
        </template>
        <template v-for="(child,cindex) in item.children" :key="child.path">
          <el-menu-item :index='`${index+1}-${cindex+1}`' v-if="!child.children" @click="routeTo(child.meta.link)">
            <el-icon>
              <location/>
            </el-icon>
            <template #title>{{ getLanguage("menu")[child.meta.title] }}</template>
          </el-menu-item>
          <el-sub-menu :index='`${index+1}-${cindex+1}`' v-else>
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>{{ getLanguage("menu")[child.title] }}</span>
            </template>
            <template v-for="(gChild,gIndex) in child.children" :key="gChild.path" @click="routeTo(gChild.meta.link)">
              <el-menu-item :index="`${index+1}-${cindex+1}-${gIndex+1}`">
                <el-icon>
                  <location/>
                </el-icon>
                <template #title>{{ getLanguage("menu")[gChild.meta.title] }}</template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import {useThemeConfig} from "@/store/themeConfig";
import {storeToRefs} from "pinia";
import {useUserInfo} from "@/store/useUserInfo";
import {onMounted, reactive} from "vue";
import useLanguage from "@/hooks/useLanguage";
import {useRoute, useRouter} from "vue-router";
import {Local} from "@/utils/storage";

const {getLanguage} = useLanguage();
const themeConfigStore = useThemeConfig();
const userInfoStore = useUserInfo();
const {themeConfig} = storeToRefs(themeConfigStore);
const {userInfo} = storeToRefs(userInfoStore);
const router = useRouter();

const state = reactive({
  menuList: []
});


const initMenu = () => {
  const routerList = Local.get("routerList")
  if (routerList) state.menuList = routerList
  else createMenuList()
}

onMounted(() => {
  // createMenuList();
  // console.log(state.menuList)
  initMenu()

  // 处理
});

const createMenuList = () => {
  const roleList = userInfo.value.roles;
  let menuList: any = [];
  const leaves = roleList.filter(route => {
    if (route.pid !== 0) {
      return {
        path: route.path,
        name: route.name,
        meta: {
          routeId: route.routeId,
          pid: route.pid,
          title: route.title,
          icon: route.icon,
          link: route.link
        }
      }
    }
  });
  menuList = roleList.reduce((pre: any, next) => {
    if (next.pid === 0) {
      pre.push({
        path: next.path,
        name: next.name,
        meta: {
          routeId: next.routeId,
          pid: next.pid,
          title: next.title,
          icon: next.icon,
        }
      });
    }
    return pre;
  }, []);
  converter(menuList, leaves);
  state.menuList = menuList;
};
const converter = (source: any[], children: any[]) => {
  const _source: any = [];
  const leaves: any = [];
  children.forEach(child => {
    const parent = source.find(c => c.routeId === child.pid);
    if (!parent) leaves.push(child);
    else {
      _source.push(child);
      if (!parent.children) parent.children = [];
      parent.children.push(child);
    }
  });
  if (leaves.length && _source.length) {
    converter(_source, leaves);
  }
};

const route = useRoute();
const routeTo = (path: string) => {
  router.push({
    path: path
  });
};

</script>

<style scoped lang="scss">
.xx-menu:not(.el-menu--collapse) {
  width: 215px;

}
</style>
