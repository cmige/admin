<template>
	product
	<router-view v-slot="{Component, route}">
		<component :is="Component" :key="route.name"></component>
	</router-view>
</template>

<script setup lang="ts">

</script>

