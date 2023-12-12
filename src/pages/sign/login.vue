<script setup>
import { reactive, ref } from 'vue'
import { login } from '@/api'
import router from '@/router';

const formRef = ref()
const isSending = ref(false)

const form = reactive({
    username: '',
    password: '',
    remember: false
})

const rule = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

const userLogin = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (fields) {
            isSending.value = false;
        } else {
            isSending.value = true;
        }
        login(form.username, form.password, form.remember, () => {
            isSending.value = false;
            router.push('/')
        }, (message, code, url) => {
            isSending.value = false;
            console.warn(`请求地址: ${url}, 状态码: ${code}, 错误信息: ${message}`)
            ElMessage.warning(message)
        }, (err) => {
            isSending.value = false;
            console.error(err)
            ElMessage.warning("发生错误")
        })
    })
}
</script>

<template>
    <div style="text-align: center;margin: 0 20px;">
        <div style="margin-top: 120px;">
            <div style="font-size: 25px;font-weight: bold;">欢迎登录</div>
        </div>
        <div style="margin-top: 20px;">
            <ElForm :model="form" :rules="rule" ref="formRef">
                <ElFormItem prop="username">
                    <ElInput v-model="form.username" size="large" maxlength="10" type="text" placeholder="用户名/邮箱">
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
                <ElRow>
                    <ElCol :span="12" style="text-align: left;">
                        <ElFormItem prop="remember">
                            <ElCheckbox v-model="form.remember" label="记住我"></ElCheckbox>
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span="12" style="text-align: right;">
                        <ElLink @click="$router.push('/sign/reset')" :underline="false">忘记密码
                            <IEpTopRight />
                        </ElLink>
                    </ElCol>
                </ElRow>
            </ElForm>
        </div>
        <div style="margin-top: 10px;">
            <ElButton @click="userLogin(formRef)" :loading="isSending" size="large" style="width: 270px;" type="success"
                plain>立即登录</ElButton>
        </div>
        <ElDivider>
            <span style="font-size: 13px;color: grey;">没有账号</span>
        </ElDivider>
        <!-- <div> -->
        <ElButton @click="$router.push('/sign/register')" style="width: 270px;" size="large" type="warning" plain>
            立即注册
        </ElButton>
        <!-- </div> -->
    </div>
</template>