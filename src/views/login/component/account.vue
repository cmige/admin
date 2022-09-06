<template>
	<el-form
			:model="formState"
			class="login-form"
			ref="formRef"
			:rules="formRules"
	>
		<el-form-item prop="account" class="login-form-item1">
			<el-input
					v-model="formState.account"
					:prefix-icon="User"
					clearable
					:placeholder="getLanguage('login').placeholder.account"
			/>
		</el-form-item>

		<el-form-item prop="password" class="login-form-item2">
			<el-input v-model="formState.password"
								:type="formState.showPassword?'text':'password'"
								:prefix-icon="Lock"
								:placeholder="getLanguage('login').placeholder.password"
			>
				<template #suffix>
					<el-icon class="password-suffix" @click="formState.showPassword = !formState.showPassword">
						<View v-if="!formState.showPassword"/>
						<Hide v-else/>
					</el-icon>
				</template>
			</el-input>
		</el-form-item>

		<el-form-item prop="verifyCode" class="login-form-item3">
			<el-row style="width: 100%" justify="space-between">
				<el-col :span="16">
					<el-input
							v-model="formState.verifyCode"
							:prefix-icon="Promotion"
							:placeholder="getLanguage('login').placeholder.verifyCode"
					/>
				</el-col>
				<el-col :span="7">
					<VerifyCode ref="verifyRef" @click="refreshCode" @getInitCode="getInitCode"></VerifyCode>
				</el-col>
			</el-row>
		</el-form-item>

		<el-form-item class="login-form-item4">
			<el-button type="primary" @click="submitForm(formRef)"> 登录</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import {reactive, readonly, ref} from "vue";
import {Hide, Lock, Promotion, User, View} from "@element-plus/icons-vue";
import VerifyCode from "./verifyCode.vue";
import type {FormInstance} from "element-plus";
import useLanguage from "@/hooks/useLanguage";
import {useRouter} from "vue-router";
import {useUserInfo} from "@/store/useUserInfo";
import {addRoute} from "@/router";

const {getLanguage} = useLanguage();
const store = useUserInfo();
const router = useRouter();
const verifyRef = ref();
const formRef = ref();
const formState = reactive({
	account: "admin",		// 帐号
	password: "admin",	// 密码
	verifyCode: "",			// 验证码
	showPassword: false
});

const validatePass = (rule: any, value: any) => {
	let validateObj;
	let lang = localStorage.getItem("language");
	if (lang === "zh-cn") {
		validateObj = rule.field === "account" ? "帐号" :
				rule.field === "password" ? "密码" : "验证码";
	} else {
		validateObj = rule.field;
	}
	if (value === "") return Promise.reject(new Error(`${validateObj} ${getLanguage("login").errMsg.isnull}`));
	if (value.length < 4 || value.length > 12) return Promise.reject(new Error(`${validateObj} ${getLanguage("login").errMsg.lengthErr}`));
	return Promise.resolve();
};

const checkVerifyCode = (rule: any, value: any) => {
	const isChecked = verifyRef.value && verifyRef.value.checkCode(value);
	if (!isChecked) return Promise.reject(new Error(`${getLanguage("login").errMsg.verifyErr}`));
	return Promise.resolve();
};
const formRules = readonly({
	account: [{validator: validatePass, trigger: "blur"}],
	password: [{validator: validatePass, trigger: "blur"}],
	verifyCode: [{validator: checkVerifyCode, trigger: "blur"}]
});

const refreshCode = () => {
	verifyRef.value.refreshCode();
};
const getInitCode = (code: string) => {
	formState.verifyCode = code;
};

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate()
			.then(res => {
				const jsonStr = {account: formState.account, password: formState.password};
				loginRequest(jsonStr);
			})
			.catch(err => console.log(err));
};

const loginRequest = async (data: any) => {
	const result: any = await store.login(data);
	if (result) {
		// 获取用户权限信息
		const userInfo: any = await store.getUserInfo();
		// 动态添加路由
		userInfo?.roles && addRoute(userInfo.roles);
		// 跳转到首页
		router.replace("/home");
	}
};

</script>

<style scoped lang="scss">

.login-form {
	@for $i from 1 through 4 {
		.login-form-item#{$i} {
			opacity: 0;
			animation-name: login-animation;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: 0.1s * $i;
		}
	}

	.login-form-item4 {
		margin-top: 40px;

		::v-deep(.el-button) {
			width: 100%;
			border-radius: 20px;
			color: white;
		}
	}

	.login-form-item2 {
		::v-deep(.password-suffix) {
			cursor: pointer;
		}
	}

}
</style>
