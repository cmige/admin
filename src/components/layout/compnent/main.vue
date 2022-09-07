<template>
	<div class="main-container">
		<router-view v-slot="{Component, route}">
			<keep-alive>
				<suspense>
					<component :is="Component" :key="route.name"></component>
					<template #fallback>loading.....</template>
				</suspense>
			</keep-alive>
		</router-view>
	</div>
</template>

<script setup lang="ts">
import "animate.css";</script>

<style scoped lang="scss">


</style>
