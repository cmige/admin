<template>
	<div class="xx-login">
		<div class="login-warp">
			<div class="login-content">
				<div class="login-item-title">
					<span>vue-admin</span>
				</div>
				<div class="login-item" v-if="!state.isScan">
					<el-tabs v-model="state.activeName">
						<el-tab-pane :label="getLanguage('login').account" name="account">
							<Account/>
						</el-tab-pane>
						<el-tab-pane :label="getLanguage('login').mobile" name="mobile">
							<Phone/>
						</el-tab-pane>
					</el-tabs>
				</div>
				<Scan v-else></Scan>
				<div class="login-corner" @click="state.isScan = !state.isScan">
					<i class="iconfont" :class="{'icon-erweima': state.isScan, 'icon-diannao' : !state.isScan}"></i>
					<div class="login-corner-mask"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import Account from "@/views/login/component/account.vue";
import Phone from "@/views/login/component/phone.vue";
import Scan from "@/views/login/component/scan.vue";
import useLanguage from "@/hooks/useLanguage";
import {reactive} from "vue";

const {getLanguage} = useLanguage();

const state = reactive({
	activeName: "account",
	isScan: false
});


const router = useRouter();


</script>

<style scoped lang="scss">
.xx-login {
	width: 100%;
	height: 100%;
	position: relative;

	.login-header {
		position: absolute;
		top: 100px;
		left: 100px;
	}

	.login-warp {
		position: absolute;
		padding: 5px;
		width: 400px;
		height: 400px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 10px;
		background-color: aqua;

		.login-content {
			border-radius: 10px;
			padding: 0 30px;
			height: calc(100% - 2px);
			background-color: white;
			z-index: 1;
			position: relative;

			.login-item-title {
				font-size: 18px;
				text-align: center;
				padding: 30px 0 20px 0;

			}

			::v-deep(.el-tabs__header) {
				margin-bottom: 25px;
			}

			::v-deep(.el-form-item) {
				margin-bottom: 20px;
			}

			.login-corner {
				position: absolute;
				top: 0;
				right: 0;
				width: 50px;
				height: 50px;
				overflow: hidden;
				cursor: pointer;
				transition: all ease 0.3s;
				color: var(--el-text-color-primary);

				&-mask {
					position: absolute;
					transform: rotate(-45deg);
					background-color: white;
					width: 30px;
					height: 70px;
					right: 18px;
				}

				.icon-diannao {
					right: 0;
					top: -2px
				}

				i {
					width: 50px;
					height: 50px;
					display: inline-block;
					font-size: 48px;
					position: absolute;
					right: -2px;
				}

				&:hover {
					opacity: 1;
					transition: all ease 0.3s;
					color: var(--el-color-primary) !important;
				}
			}

		}
	}
}
</style>
