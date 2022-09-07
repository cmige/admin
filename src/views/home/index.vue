<template>
	<div>
		home
		<el-button @click="test">test</el-button>
	</div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();
const test = () => {
	router.push("/products/category");
};
</script>

<style lang="scss" scoped>

</style>
