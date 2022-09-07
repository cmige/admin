### 路由 + keep-alive + 异步组件出现的问题

- 情况：menu 二级菜单与一级菜单来回切换时出现的视图错位
  - 例如 
  - ``````
    路由                              视图
    /product/category                product category
    /role                            role
    快速来回切换 -->
    /role                            product role
    ``````
  
- router-view
  ```
  old
  <router-view v-slot="{Component, route}">
    <keep-alive>
      <component :is="Component" :key="route.name"></component>
    </keep-alive>
  </router-view>
  
  new
  <router-view v-slot="{Component, route}">
    <keep-alive>
      <suspense> #+++++# 
        <component :is="Component" :key="route.name"></component>
        <template #fallback>loading........</template>
      </suspense> #+++++# 
    </keep-alive>
  </router-view>
  
  new2
  <router-view v-slot="{Component, route}">
    <keep-alive include='["childrenComponentName","childrenComponentName"]'>
      <component :is="Component" :key="route.name"></component>
    </keep-alive>
  </router-view>
  ```
- perhaps：
  - 组件是异步组件，如果不使用 suspense 等待组件完成，遇到多级路由时会渲染了内层 router-view, 而后组件会渲染到内层的 router-view
  - 可以通过 keep-alive 将多级子组件缓存起来解决这个问题