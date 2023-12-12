<script setup>
import { ref } from 'vue';
import { Menu as IconMenu, Location, Setting, UserFilled } from '@element-plus/icons-vue';
import { logout } from '@/api';
import router from '@/router';

const drawer = ref(false)
const radio1 = ref('Option 1')

function cancelClick() {
    drawer.value = false
}

function confirmClick() {
    ElMessageBox.confirm(`确认提交用户 ${radio1.value} ?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    })
        .then(() => {
            drawer.value = false
        })
        .catch(() => {
            // catch error
        })
}

function userLogout() {
    logout(() => router.push('/sign'))
}

const isCollapse = ref(true)
</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
}

.container .el-container {
    height: 100%;
}

.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.container .el-container .el-aside .el-menu {
    border-right: 0;
}

.container .el-container .el-aside {
    border-right: solid 1px #dcdfe6;
}

.container .el-container .el-header {
    display: flex;
    padding-left: 10px;
    align-items: center;
    border-bottom: solid 1px #dcdfe6;
}

.container .el-container .el-header .myavatar {
    position: absolute;
    right: 19px;
}

.container .el-container .el-footer {
    height: 25px;
    text-align: center;
}
</style>

<template>
    <div class="container">
        <ElContainer>
            <ElAside width="collapse">
                <el-menu class="el-menu-vertical" :collapse="isCollapse" router>
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>主要</span>
                        </template>
                        <el-menu-item index="/home">主页</el-menu-item>
                        <el-menu-item index="/home/test">测试</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <template #title>Navigator Two</template>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>设置</template>
                    </el-menu-item>
                </el-menu>
            </ElAside>
            <ElContainer>
                <ElHeader>
                    <ElRadioGroup v-model="isCollapse">
                        <ElRadioButton :label="false">
                            <IEpExpand></IEpExpand>
                        </ElRadioButton>
                        <ElRadioButton :label="true">
                            <IEpFold></IEpFold>
                        </ElRadioButton>
                    </ElRadioGroup>
                    <!-- <ElPageHeader icon="null">
                        <template #content>
                            <span class="text-large font-600 mr-3"> FEI自由 </span>
                        </template>
                    </ElPageHeader> -->
                    <div class="myavatar">
                        <el-dropdown>
                            <ElAvatar :icon="UserFilled" />
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="drawer = true">个人设置</el-dropdown-item>
                                    <el-dropdown-item @click="userLogout()">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </ElHeader>
                <ElMain>
                    <RouterView></RouterView>
                </ElMain>
            </ElContainer>
        </ElContainer>
    </div>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>个人设置</h4>
        </template>
        <template #default>
            <div>
                <el-radio v-model="radio1" label="Option 1" size="large">Option 1</el-radio>
                <el-radio v-model="radio1" label="Option 2" size="large">Option 2</el-radio>
            </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>