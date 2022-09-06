<template>
	<div class="phone-verify-container">
		<el-row justify="space-between" align="middle" class="phone-verify-content">
			<el-col :span="12" class="phone-verify-content-left">
				<span>{{ props.code }}</span>
				<br>
				<span>vue-admin | 验证码</span>
			</el-col>

			<el-col :span="5" class="phone-verify-content-right">
				<el-button size="small" @click="copyText(props.code)">复制</el-button>
			</el-col>
		</el-row>
		<div class="phone-verify-msg">
			<span>【vue-admin】验证码{{ props.code }}，用于登录。验证码在1分钟内有效，请尽快输入。如非本人操作，请忽略本条信息。</span>
		</div>
	</div>
</template>


<script lang="ts" setup>
type Props = {
	code: string,
	phone: number
}
const props = defineProps<Props>();
const emits = defineEmits(["close"]);
const copyText = (text: string) => {
	return new Promise((resolve, reject) => {
		try {
			navigator.clipboard.writeText(text);
			resolve(true);
			emits("close");
		} catch (e) {
			reject(e);
		}
	});
};
</script>

<style scoped lang="scss">
.phone-verify-container {
	width: 300px;
	border-radius: 10px;
	background-color: unset;
	padding: 10px 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.phone-verify-content {
		&-left {
			flex: 1;

			&:nth-child(0) {
				font-size: 16px;
				font-weight: bold;
			}

			&:nth-child(1) {
				font-size: 12px;
			}
		}

		&-right {
			.el-button {
				border-radius: 30px;
			}
		}

		padding-bottom: 10px;
		border-bottom: 0.5px solid silver;
	}

	.phone-verify-msg {
		margin-top: 10px;
		font-size: 12px;
	}
}
</style>
