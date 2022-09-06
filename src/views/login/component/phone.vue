<template>
	<el-form
			:model="formState"
			class="login-form-phone"
			ref="formRef"
			:rules="formRules"
	>
		<el-form-item prop="phone" class="login-form-phone-item1">
			<el-input
					v-model="formState.phone"
					:prefix-icon="Iphone"
					clearable
					:placeholder="getLanguage('login').placeholder.phone"
			/>
		</el-form-item>

		<el-form-item prop="verifyCode" class="login-form-phone-item2">
			<el-row style="width: 100%" justify="space-between">
				<el-col :span="16">
					<el-input
							v-model="formState.phoneVerifyCode"
							:prefix-icon="Promotion"
							:placeholder="getLanguage('login').placeholder.phoneVerifyCode"
					/>
					<span v-if="formState.isClose">验证码：{{ formState.sentCode }}</span>
				</el-col>
				<el-button @click="submitPhoneCode" :disabled="formState.hasSubmit">
					{{ formState.hasSubmit ? formState.countDown + "s" : "发送验证码" }}
				</el-button>
			</el-row>
		</el-form-item>

		<el-form-item class="login-form-phone-item3">
			<el-button type="primary" @click="submitForm(formRef)">登录</el-button>
		</el-form-item>

		<div class="login-form-phone-item4">
			<span>
				* 提示： 手机发送验证码验证登录功能以另外一种形式实现，暂不采取短信的方式进行
			</span>
		</div>

		<!--		<PhoneVerify></PhoneVerify>-->
	</el-form>
</template>

<script setup lang="ts">
import {getCurrentInstance, h, reactive, readonly, ref} from "vue";
import {Iphone, Promotion} from "@element-plus/icons-vue";
import useLanguage from "@/hooks/useLanguage";
import type {FormInstance} from "element-plus";
import {usePhoneVerify} from "@/hooks/usePhoneVerify";
import PhoneVerify from "@/views/login/component/phoneVerify.vue";

const {getLanguage} = useLanguage();
const {getCode, checkCode} = usePhoneVerify();
const instance = <any>getCurrentInstance();
const phoneReg = /^1[3-8]\d{9}$/;
const formRef = ref();
const formState = reactive({
	phone: "",
	phoneVerifyCode: "",
	hasSubmit: false,
	countDown: 60,
	isClose: false,
	sentCode: ""
});

const validatePass = (rule: any, value: any) => {
	if (rule.field === "phone") {
		if (!phoneReg.test(formState.phone)) return Promise.reject(`${getLanguage("login").errMsg.phoneRoleErr}`);
		return Promise.resolve(true);
	}
};

const validatePass2 = (rule: any, value: any) => {
	return checkCode(formState.phoneVerifyCode);
};


const formRules = readonly({
	phone: [{validator: validatePass, trigger: "blur"}],
	verifyCode: [{validator: validatePass2, trigger: "blur"}]
});

const submitForm = (formRef: FormInstance | undefined) => {
	if (!formRef) return;
	formRef.validate()
			.then(res => {
				// 登录操作
			});
};

const submitPhoneCode = async () => {
	// 首先验证手机号码格式是否正确
	if (!phoneReg.test(formState.phone)) {
		ElMessage({
			message: "请输入正确的手机号",
			type: "error",
		});
		return;
	}

	if (formState.hasSubmit) return;
	formState.hasSubmit = true;

	instance.proxy.mittBus.emit("getPhoneVerify", formState.phone);

	const auth_time = setInterval(() => {
		formState.countDown -= 1;
		if (formState.countDown <= 0) {
			formState.hasSubmit = false;
			formState.countDown = 60;
			clearInterval(auth_time);
		}
	}, 1000);

	const verifyCode = await getCode();
	let elMessageInstance: any;
	setTimeout(() => {
		elMessageInstance = ElMessage({
			type: "success",
			message: h(PhoneVerify, {phone: formState.phone, code: verifyCode, onClose: handleClose}),
			duration: 5000,
			onClose: handleClose
		});
	}, 3000);

	const handleClose = () => {
		elMessageInstance.close && elMessageInstance.close();
		formState.isClose = true;
		formState.sentCode = verifyCode;
	};
};

</script>

<style scoped lang="scss">

.login-form-phone {
	@for $i from 1 through 4 {
		&-item#{$i} {
			opacity: 0;
			animation-name: login-animation;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: 0.1s * $i;
		}
	}

	&-item2 {
		::v-deep(.el-button) {
			flex: 1;
			margin-left: 10px;
		}

		span {
			font-size: 12px;
			line-height: 1;
			padding-top: 2px;
			color: rgba(0, 0, 0, 0.6);
			position: absolute;
			top: 100%;
			transform: translateX(-100%);
		}
	}

	&-item3 {
		margin-top: 40px;

		::v-deep(.el-button) {
			width: 100%;
			border-radius: 20px;
			color: white;
		}
	}

	&-item4 {
		font-size: 14px;
		color: #cccccc;
	}

}

</style>
