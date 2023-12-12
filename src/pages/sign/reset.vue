<script setup>
import { reactive, ref, computed } from 'vue';
import { get, post } from '@/api';
import router from '@/router';

const codeTime = ref(0)
const formRef = ref()
const active = ref(0)
const isSending = ref(false)
const form = reactive({
    email: '',
    code: '',
    password: '',
    password_repeat: ''
})

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
    email: [
        { required: true, message: '请输入电子邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change'] },
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 25, message: '密码长度在6-25位', trigger: ['blur', 'change'] }
    ],
    password_repeat: [
        { validator: validatePassword, trigger: ['blur', 'change'] }
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

function confirmReset() {
    formRef.value.validate((valid) => {
        if (valid) {
            isSending.value = true;
            post('/api/auth/reset-confirm', {
                email: form.email,
                code: form.code
            }, () => {
                isSending.value = false;
                active.value++
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

function doReset() {
    formRef.value.validate((valid) => {
        if (valid) {
            isSending.value = true;
            post('/api/auth/reset-password', { ...form }, () => {
                isSending.value = false;
                ElMessage.success('密码重置成功,请重新登录')
                router.push('/sign')
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
    <div style="text-align: center;">
        <div style="margin-top: 30px;">
            <ElSteps :active="active" finish-status="success" align-center>
                <ElStep title="验证电子邮件"></ElStep>
                <ElStep title="重设密码"></ElStep>
            </ElSteps>
        </div>
        <div style="margin: 0 20px;" v-if="active === 0">
            <div style="margin-top: 80px;">
                <div style="font-size: 25px;font-weight: bold;">重置密码</div>
            </div>
            <div style="margin-top: 50px;">
                <ElForm :model="form" :rules="rule" ref="formRef">
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
                                <ElButton @click="askCode" :disabled="!isEmailValid || codeTime > 0" size="large"
                                    type="success" plain>{{ codeTime > 0 ? `请稍后 ${codeTime}秒` : '获取验证码' }}
                                </ElButton>
                            </ElCol>
                        </ElRow>
                    </ElFormItem>
                </ElForm>
            </div>
            <div style="margin-top: 20px;">
                <ElButton @click="confirmReset" :loading="isSending" style="width: 270px;" size="large" type="warning"
                    plain>开始重置</ElButton>
            </div>
        </div>
        <div style="margin: 0 20px;" v-if="active === 1">
            <div style="margin-top: 80px;">
                <div style="font-size: 25px;font-weight: bold;">重置密码</div>
            </div>
            <div style="margin-top: 50px;">
                <ElForm :model="form" :rules="rule" ref="formRef">
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
                </ElForm>
            </div>
            <div style="margin-top: 20px;">
                <ElButton @click="doReset" :loading="isSending" style="width: 270px;" size="large" type="danger" plain>重置密码
                </ElButton>
            </div>
        </div>
    </div>
</template>