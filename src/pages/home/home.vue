<template>
    <!-- <div>index</div> -->
    <ElScrollbar height="100%">
        <p v-for="item in 20" :key="item" class="scrollbar-item">{{ item }}</p>
    </ElScrollbar>
</template>

<script></script>

<style scoped>
.scrollbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
</style>