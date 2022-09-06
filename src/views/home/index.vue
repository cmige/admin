<template>
	<div>
		home
		<el-button @click="test">test</el-button>
	</div>
</template>

<script lang="ts" setup>
import instance from "@/api";

const test = async () => {
	console.log(await instance.get("/api/getUserInfo"));
};
</script>

<style lang="scss" scoped>

</style>
