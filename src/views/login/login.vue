<template>
	<div class="login-wrap">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-container" autocomplete="off"
			label-position="left">
			<div class="title-container">
				{{ $t('login.title') }}
			</div>

			<el-form-item prop="userName">
				<svg class="icon icon-user" aria-hidden="true">
					<use xlink:href="#iconuser"></use>
				</svg>
				<el-input ref="userName" v-model="loginForm.userName" :placeholder="$t('login.username')"
					name="userName" type="text" autocomplete="off" />
			</el-form-item>

			<el-form-item prop="passWord">
				<svg class="icon icon-user" aria-hidden="true">
					<use xlink:href="#iconlock"></use>
				</svg>
				<el-input ref="passWord" v-model="loginForm.passWord" :placeholder="$t('login.password')"
					name="password" autocomplete="off" />
			</el-form-item>

			<el-button :loading="loading" type="primary" class="btn" @click.native.prevent="handleSubmit">
				{{ $t('login.logIn') }}
			</el-button>

		</el-form>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from 'vue-property-decorator'
	import {
		UserModule
	} from '@/store/module/user'

	@Component({})
	export default class extends Vue {

		loginForm: any = {
			userName: 'admin',
			passWord: '123456'
		}
		validateUsername: Function = (rule: any, value: string, callback: Function) => {
			if (value === '') {
				callback(new Error('请输入用户名'))
			} else {
				callback()
			}
		}
		validatePassword: Function = (rule: any, value: string, callback: Function) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			} else {
				callback()
			}
		}
		loginRules: any = {
			userName: [{
				validator: this.validateUsername,
				trigger: 'blur'
			}],
			passWord: [{
				validator: this.validatePassword,
				trigger: 'blur'
			}]
		}
		loading: boolean = false


		// methods
		handleSubmit() {
			(this.$refs.loginForm as HTMLFormElement).validate(async (valid: boolean) => {
				if (valid) {
					this.loading = true
					await UserModule.login(this.loginForm)
					this.$router.push({
						path: '/mam'
					})
					this.loading = false
				} else {
					return false
				}
			})
		}

	}
</script>

<style lang="less">
	.login-wrap {
		height: 100%;
		width: 100%;
		overflow: hidden;
		background: #0455ab;

		.login-container {
			box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
			background-clip: padding-box;
			margin: 180px auto;
			margin: 70px auto;
			width: 18vw;
			padding: 35px 35px 15px 35px;
			box-shadow: 0 0 25px #cac6c6;
			z-index: 999;
			position: relative;
			background-size: 350px 357px;

			.title-container {
				margin: 0px auto 20px auto;
				text-align: center;
				color: #fff;
				font-size: 2.8vmin;
			}

			.icon-user {
				position: absolute;
				top: 13px;
				left: 5px;
				z-index: 1001;
			}

			.el-input__inner {
				padding: 0 25px;
			}

			.btn {
				width: 100%;
				margin-bottom: 30px;
			}

		}
	}
</style>