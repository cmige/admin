<template>
  <div class="xx-pagination">
    <el-pagination class="my-pagination"
                   :layout="props.layout"
                   :total="props.total"
                   :small="props.small"
    />
  </div>
</template>

<script setup lang="ts">

type Props = {
  small?: boolean,
  background?: boolean,
  pageSize?: number,
  total?: number | null
  pagerCount?: number
  currentPage?: number
  layout?: string
}
const props = withDefaults(defineProps<Props>(), {
  small: true,
  background: false,
  pageSize: 10,
  total: 10,
  pagerCount: 7,
  currentPage: 1,
  layout: "total, sizes, prev, pager, next, jumper"
})

</script>

<style scoped lang="scss">

</style>
