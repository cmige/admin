<template>
	<div class="main-container">
		<router-view v-slot="{Component, route}">
			<transition
					enter-active-class="animate__animated animate__fadeInLeft"
					mode="out-in">
				<keep-alive>
					<component :is="Component" :key="route.name"></component>
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script setup lang="ts">
import "animate.css";</script>

<style scoped lang="scss">


</style>
