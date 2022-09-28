<template>
  <el-dialog v-model="state.visible" custom-class="xx-dialog" destroy-on-close :show-close="false">
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
            :model="state.roleForm"
            style="max-width: 500px"
        >
          <el-form-item label="roleName">
            <el-input v-model="state.roleForm.roleName"/>
          </el-form-item>

          <el-form-item label="role">
            <el-tree
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
                show-checkbox
            />
          </el-form-item>

        </el-form>
      </div>
    </template>

    <template #footer>
      <div class="xx-dialog-footer">
        <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
        <el-button type="primary" size="small" @click="close">取消</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import {reactive} from "vue";
import {addRole} from "@/api"

const state = reactive({
  visible: false,
  roleForm: {
    roleName: "",
    roleList: []
  }
})

interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}


const handleConfirm = async () => {
  const result = await addRole({
    roleName: "123456",
    roleList: ["123456"],
    authName: "admin"
  })
  console.log(result)
}

const open = (operations: string) => {
  state.visible = true
}

const close = () => {
  state.visible = false
}

defineExpose({
  open
})

</script>
