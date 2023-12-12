<template>
    <ElResult icon="warning" title="404" sub-title="抱歉,访问的页面走丢了~">
        <template #extra>
            <ElButton type="primary" @click="this.$router.push('/home')">返回首页</ElButton>
        </template>
    </ElResult>
</template>