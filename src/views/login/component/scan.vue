<template>
	<div class="scan-container">
		<div class="scan-content" ref="qrcodeRef" @click="refreshCode"></div>
		<div class="scan-msg">打开微信扫一扫，快速登录注册</div>
	</div>

</template>

<script setup lang="ts">
import QRCode from "qrcodejs2-fixes";
import {onMounted, reactive, ref} from "vue";

const qrcodeRef = ref();

type Props = {
	width?: number,
	height?: number,
	colorDark?: string,
	colorLight?: string
}

const props = withDefaults(defineProps<Props>(), {
	width: 230,
	height: 230,
	colorDark: "#000000",
	colorLight: "#ffffff",
});

const state = reactive<{ qrcodeInstance: any }>({
	qrcodeInstance: null
});

onMounted(() => {
	createQRCode();
});

const createQRCode = () => {
	let qrcodecontainer = qrcodeRef.value;
	qrcodecontainer.innerHTML = "";
	let qrcode = new QRCode(qrcodecontainer, {
		text: "123456",
		width: props.width,
		height: props.height,
		colorDark: props.colorDark,
		colorLight: props.colorLight,
		correctLevel: QRCode.CorrectLevel.H
	});
	state.qrcodeInstance = qrcode;
};

const refreshCode = () => {
	console.log("refreshCode");
	state.qrcodeInstance.clear();
	state.qrcodeInstance.makeCode("http://naver.com");
};

</script>

<style scoped lang="scss">

.animation {
	opacity: 0;
	animation-name: login-animation;
	animation-duration: 0.5s;
	animation-fill-mode: forwards;
}

.scan-container {
	width: 100%;
	height: calc(100% - 100px);
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.scan-content {
		@extend .animation;
		animation-delay: 0.1s;
	}

	.scan-msg {
		@extend .animation;
		animation-delay: 0.2s;
		margin-top: 15px;
		font-size: 12px;
		color: #ccc;
	}
}


</style>
