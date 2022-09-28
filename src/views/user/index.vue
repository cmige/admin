<template>
  <div class="xx-main-user">
    <el-card class="xx-user-card" shadow="hover">
      <template #header>
        <div class="xx-user-card-header">
          <span class="title">用户新增创建</span>
          <div class="xx-role-card-header-control">
            <el-input size="small"></el-input>
            <div class="controller">
              <el-button type="primary" icon="Search" style="margin-left: 10px">搜索</el-button>
              <el-button icon="CirclePlus" @click="state.addUserDialogShow = !state.addUserDialogShow">添加</el-button>
            </div>
          </div>
        </div>
      </template>
      <div class="xx-user-card-container">
        <el-table :data="state.userList" style="width: 100%" border>
          <el-table-column prop="account" label="Account" min-width="80"/>
          <el-table-column prop="username" label="userName" min-width="80">
            <template #default="scope">
              <span>{{ scope.row.username ? scope.row.username : "- - -" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="phone" min-width="60">
            <template #default="scope">
              <span>{{ scope.row.phone ? scope.row.phone : "- - -" }}</span>
            </template>
          </el-table-column>
          >
          <el-table-column prop="email" label="email" min-width="60">
            <template #default="scope">
              <span>{{ scope.row.email ? scope.row.email : "- - -" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="createTime" min-width="120">
            <template #default="scope">
              <span>{{ formatTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userRole" label="role" min-width="60">
            <template #default="scope">
              <el-tag
                  disable-transitions
                  v-for="item in scope.row.userRole"
                  :type="item === 'admin' ? 'success' : ''"
              >{{ item }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operations" width="100">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleClick"
                         :disabled="scope.row.userRole.indexOf('admin') !== -1">修改
              </el-button>
              <el-button link type="primary" size="small" :disabled="scope.row.userRole.indexOf('admin') !== -1">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination></Pagination>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="state.addUserDialogShow" custom-class="xx-dialog" destroy-on-close :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="xx-dialog-header">
        <span :id="titleId" :class="titleClass">创建用户</span>
        <el-button type="danger" @click="close" circle text plain>
          <el-icon>
            <CircleClose/>
          </el-icon>
        </el-button>
      </div>
    </template>

    <template #default>
      <div class="xx-dialog-content">
        <el-form
            label-position="right"
            label-width="80px"
            :model="state.registerForm"
            style="max-width: 500px"
        >
          <el-form-item label="account">
            <el-input v-model="state.registerForm.account"/>
          </el-form-item>
          <el-form-item label="password">
            <el-input v-model="state.registerForm.password"/>
          </el-form-item>
          <el-form-item label="phone">
            <el-input v-model="state.registerForm.phone"/>
          </el-form-item>
          <el-form-item label="email">
            <el-input v-model="state.registerForm.email"/>
          </el-form-item>
          <el-form-item label="role">
            <el-select
                style="width: 100%"
                v-model="state.registerForm.role"
                class="m-2"
                placeholder="Select"
                fit-input-width
                clearable
            >
              <!--              <el-option-->
              <!--                  v-for="item in options"-->
              <!--                  :key="item.value"-->
              <!--                  :label="item.label"-->
              <!--                  :value="item.value"-->
              <!--              />-->
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </template>

    <template #footer>
      <div class="xx-dialog-footer">
        <el-button type="primary" size="small">确定</el-button>
        <el-button type="primary" size="small" @click="state.addUserDialogShow = !state.addUserDialogShow">取消
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {getUserList} from "@/api"
import Pagination from "@/components/pagination/index.vue"
import {formatTime} from "@/utils/formatTime"

const state = reactive({
  addUserDialogShow: false,
  registerForm: {
    account: "",
    nickName: "",
    password: "",
    phone: null,
    email: "",
    createTime: null
  },
  userList: []
})


const handleClick = () => {
  console.log('click')
}


onMounted(async () => {
  await initUserList()

})

const initUserList = async () => {
  let result: any = await getUserList()
  console.log(result)
  state.userList = result.userList
  console.log(result.userList)
}


</script>


