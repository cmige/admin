<template>
  <div class="xx-main-role">
    <el-card class="xx-role-card" shadow="hover">
      <template #header>
        <div class="xx-role-card-header">
          <span class="title">角色权限添加</span>
          <div class="xx-role-card-header-control">
            <el-input size="small"></el-input>
            <div class="controller">
              <el-button type="primary" icon="Search" style="margin-left: 10px">搜索</el-button>
              <el-button icon="CirclePlus" @click="handleRole('add')">添加</el-button>
            </div>
          </div>
        </div>
      </template>
      <div class="xx-role-card-container">
        <el-table :data="state.roleList" style="width: 100%" border>
          <el-table-column prop="roleName" label="roleName" min-width="80"/>
          <el-table-column prop="createTime" label="createTime" min-width="80">
            <template #default="scope">
              <span>{{ formatTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="authName" label="authName" min-width="60">
            <template #default="scope">
              <span>{{ scope.row.authName ?? "- - -" }}</span>
            </template>
          </el-table-column>
          >
          <el-table-column prop="authTime" label="authTime" min-width="60">
            <template #default="scope">
              <span>{{ scope.row.authTime ? formatTime(scope.row.authTime) : "- - -" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="roleList" label="roleList" min-width="60"/>

          <el-table-column fixed="right" label="Operations" width="100">
            <template #default>
              <el-button link type="primary" size="small" @click="handleRole('update')">修改</el-button>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-card>
    <RoleDialog ref="roleDialogRef"></RoleDialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {getRoleList} from "@/api"
import {formatTime} from "@/utils/formatTime"
import RoleDialog from "./component/add.vue"

const roleDialogRef = ref()

const state = reactive({
  roleList: []
})

onMounted(async () => {
  await initRole()
})

const initRole = async () => {
  const result: any = await getRoleList()
  if (result) state.roleList = result.roleList
}

const handleRole = (operations: string) => {
  roleDialogRef.value.open(operations)
}
</script>

