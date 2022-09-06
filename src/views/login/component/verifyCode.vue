<template>
	<div class="xx-identify">
		<canvas id="myCanvas" ref="identifyCanvas" class="identify-canvas"></canvas>
	</div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, reactive, ref, watch} from "vue";

const identifyCanvas = ref<null | any>(null);
const state = reactive({
	identifyCodes: "1234567890",
	identifyCode: ""
});

type Props = {
	identifyCode?: string,
	fontSizeMin?: number,
	fontSizeMax?: number,
	backgroundColorMin?: number,
	backgroundColorMax?: number,
	colorMin?: number,
	colorMax?: number,
	lineColorMin?: number,
	lineColorMax?: number,
	dotColorMin?: number,
	dotColorMax?: number,
	contentWidth?: number,
	contentHeight?: number,

}

const props = withDefaults(defineProps<Props>(), {
	identifyCode: "1234",
	fontSizeMin: 16,
	fontSizeMax: 20,
	backgroundColorMin: 180,
	backgroundColorMax: 240,
	colorMin: 50,
	colorMax: 160,
	lineColorMin: 40,
	lineColorMax: 180,
	dotColorMin: 0,
	dotColorMax: 100,
	contentWidth: 95,
	contentHeight: 25
});
const emits = defineEmits(["getInitCode"]);

const refreshCode = () => {
	state.identifyCode = "";
	makeCode(state.identifyCodes, 4);
};

const makeCode = (source: string, length: number) => {
	for (let i = 0; i < length; i++) {
		state.identifyCode += state.identifyCodes[randomNum(0, state.identifyCodes.length)];
	}
};

const checkCode = (code: string) => {
	return code.toLowerCase() === state.identifyCode.toLowerCase();
};

const randomNum = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};

const drawPic = () => {

	let canvas = document.getElementById("myCanvas") as any;
	let ctx = canvas.getContext("2d");
	// width height 解决切换登录方式时导致 canvas 宽高丢失而无法显示问题
	let width = canvas.parentNode.clientWidth || 100;
	let height = canvas.parentNode.clientHeight ? canvas.parentNode.clientHeight - 2 : 30;
	canvas.width = width;
	canvas.height = height;
	ctx.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax);
	ctx.fillRect(0, 0, 100, 30);
	for (let i = 0; i < state.identifyCode.length; i++) {
		drawText(ctx, state.identifyCode[i], i);
	}
};

const drawText = (ctx: any, text: string, index: number) => {
	ctx.fillStyle = randomColor(props.colorMin, props.colorMax);
	ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + "px SimHei";
	let x = (index + 1) * (props.contentWidth / ((props.identifyCode as string).length + 1));
	let y = randomNum(props.fontSizeMax, props.contentHeight - 5);
	let deg = randomNum(-45, 45);
	// 修改坐标原点和旋转角度
	ctx.translate(x, y);
	ctx.rotate(deg * Math.PI / 180);
	ctx.fillText(text, 0, 0);
	// 恢复坐标原点和旋转角度
	ctx.rotate(-deg * Math.PI / 180);
	ctx.translate(-x, -y);

};

const drawLine = (ctx: any) => {
	for (let i = 0; i < 8; i++) {
		ctx.strokeStyle = randomColor(props.lineColorMin, props.lineColorMax);
		ctx.beginPath();
		ctx.moveTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
		ctx.lineTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
		ctx.stroke();
	}
};
const drawDot = (ctx: any) => {
	for (let i = 0; i < 100; i++) {
		ctx.fillStyle = randomColor(0, 255);
		ctx.beginPath();
		ctx.arc(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight), 1, 0, 2 * Math.PI);
		ctx.fill();
	}
};


const randomColor = (min: number, max: number) => {
	let r = randomNum(min, max);
	let g = randomNum(min, max);
	let b = randomNum(min, max);
	return `rgb(${r},${g},${b})`;
};

onMounted(() => {
	makeCode(state.identifyCodes, 4);
	nextTick(() => {
		emits("getInitCode", state.identifyCode);
	});
});

watch(() => state.identifyCode, () => {
	drawPic();
}, {deep: true});

defineExpose({
	refreshCode,
	checkCode
});

</script>

<style scoped lang="scss">
.xx-identify {
	width: 100%;
	height: 100%;
	max-height: 34px;
	position: relative;
	cursor: pointer;
}

.identify-canvas {
	width: 100%;
	height: 30px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);

	&:hover {
		box-shadow: 0px 2px 12px rgba(0, 0, 0, .1);
	}
}


</style>
