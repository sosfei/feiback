<script setup>
import router from '@/router';
import { reactive, ref, computed } from 'vue';
import { get, post } from '@/api';
import { ElMessage } from 'element-plus';

const codeTime = ref(0)
const formRef = ref()
const isSending = ref(false)

const form = reactive({
    username: '',
    password: '',
    password_repeat: '',
    email: '',
    code: ''
})

const validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
        callback(new Error('用户名只能是中/英文字符'))
    } else {
        callback()
    }
}

const validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== form.password) {
        callback(new Error('密码不一致'))
    } else {
        callback()
    }
}

const rule = {
    username: [
        { validator: validateUsername, trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 25, message: '密码长度在6-25位', trigger: ['blur', 'change'] }
    ],
    password_repeat: [
        { validator: validatePassword, trigger: ['blur', 'change'] }
    ],
    email: [
        { required: true, message: '请输入电子邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change'] },
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
}

function askCode() {
    if (isEmailValid) {
        codeTime.value = 60
        get(`/api/auth/ask-code?email=${form.email}&type=register`, () => {
            ElMessage.success(`验证码已发送 ${form.email}, 请注意查收`)
            setInterval(() => codeTime.value--, 1000)
        }, (message) => {
            ElMessage.warning(message)
            codeTime.value = 0
        })
    } else {
        ElMessage.warning('请输入正确的电子邮箱')
    }

}

const isEmailValid = computed(() => {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(form.email)
})

function register() {
    formRef.value.validate((valid) => {
        if (valid) {
            isSending.value = true;
            post('/api/auth/register', { ...form }, () => {
                ElMessage.success('注册成功')
                router.push('/login')
            }, (message, code, url) => {
                isSending.value = false;
                console.warn(`请求地址: ${url}, 状态码: ${code}, 错误信息: ${message}`)
                ElMessage.warning(message)
            }, (err) => {
                isSending.value = false;
                console.error(err)
                ElMessage.warning("发生错误")
            })
        } else {
            isSending.value = false;
            ElMessage.warning('请完整写入表单')
        }
    })
}
</script>

<template>
    <div style="text-align: center;margin: 0 20px;">
        <div style="margin-top: 100px;">
            <div style="font-size: 25px;font-weight: bold;">注册新用户</div>
        </div>
        <div style="margin-top: 20px;">
            <ElForm :model="form" :rules="rule" ref="formRef">
                <ElFormItem prop="username">
                    <ElInput v-model="form.username" size="large" maxlength="10" type="text" placeholder="用户名">
                        <template #prefix>
                            <IEpUser />
                        </template>
                    </ElInput>
                </ElFormItem>
                <ElFormItem prop="password">
                    <ElInput v-model="form.password" size="large" maxlength="25" type="password" show-password
                        placeholder="密码">
                        <template #prefix>
                            <IEpLock />
                        </template>
                    </ElInput>
                </ElFormItem>
                <ElFormItem prop="password_repeat">
                    <ElInput v-model="form.password_repeat" size="large" maxlength="25" type="password" show-password
                        placeholder="重复密码">
                        <template #prefix>
                            <IEpLock />
                        </template>
                    </ElInput>
                </ElFormItem>
                <ElFormItem prop="email">
                    <ElInput v-model="form.email" size="large" type="email" placeholder="邮箱">
                        <template #prefix>
                            <IEpMessage />
                        </template>
                    </ElInput>
                </ElFormItem>
                <ElFormItem prop="code">
                    <ElRow :gutter="10" style="width: 98%;">
                        <ElCol :span="17">
                            <ElInput v-model="form.code" size="large" maxlength="6" type="text" placeholder="请输入验证码">
                                <template #prefix>
                                    <IEpPromotion />
                                </template>
                            </ElInput>
                        </ElCol>
                        <ElCol :span="5">
                            <ElButton @click="askCode" :disabled="!isEmailValid || codeTime" size="large" type="success"
                                plain>{{ codeTime > 0 ? `请等待${codeTime} 秒` : '获取验证码' }}
                            </ElButton>
                        </ElCol>
                    </ElRow>
                </ElFormItem>
            </ElForm>
        </div>
        <div style="margin-top: 20px;">
            <ElButton @click="register" :loading="isSending" style="width: 270px;" size="large" type="warning" plain>
                立即注册
            </ElButton>
        </div>
        <div style="margin-top: 20px;">
            <span style="font-size: 14px;line-height: 15px;color: gray;">已有账号 · </span>
            <ElLink style="translate: 0 -1px;" @click="router.push('/sign')" :underline="false">立即登录
                <IEpTopRight />
            </ElLink>
        </div>
    </div>
</template>