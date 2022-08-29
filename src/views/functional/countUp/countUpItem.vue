<template>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item,index) in props.data" class="countItem">
    <div class="count-up-container">
      <div class="count-up-card">
        <div class="count-up-item">
          <slot name="content">
            <div class="item" v-if="props.isUseDefault">
              <span>{{ item.title }}</span>
              <span :id="`${index}-countRefs`" ref="countRefs"></span>
              <span :id="`${index}-compareRefs`" ref="compareRefs"></span>
            </div>
          </slot>
        </div>
        <div class="count-up-item-icon">
          <i></i>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script setup lang="ts">
import {CountUp} from "countup.js";
import {nextTick, onMounted, ref} from "vue";

type Props = {
  isUseDefault: boolean
  data: {
    title: string,
    count: number,
    compare: number
  }
}
const countRefs = ref<any>(null);
const compareRefs = ref<any>(null);

const props = defineProps<Props>();
onMounted(() => {
  initNumberCountUp();
});


const initNumberCountUp = () => {
  nextTick(() => {
    countRefs.value.forEach((v: any, i: number) => {
      new CountUp((document.getElementById(`${i}-countRefs`) as HTMLElement), props.data[i].count).start();
    });
    compareRefs.value.forEach((v: any, i: number) => {
      new CountUp((document.getElementById(`${i}-compareRefs`) as HTMLElement), props.data[i].compare).start();
    });
  });
};

</script>

<style lang="scss" scoped>
.count-up-container {
  background-color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, .1);
  }

  .count-up-card {
    display: flex;
    align-items: center;
    padding: 20px;

    .count-up-item {
      display: flex;
      flex: 1;
      flex-direction: column;

      .item {
        display: flex;
        flex: 1;
        flex-direction: column;

        span:nth-child(2) {
          margin: 5px 0;
        }
      }
    }

    .count-up-item-icon {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: #dcdfe6;
    }

  }

}
</style>