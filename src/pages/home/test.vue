<template>
    <ElCard style="width: 80%; margin: 80px auto" header="文件分片上传">
        <ElUpload class="upload-demo" drag action="/" multiple :http-request="handleHttpRequest"
            :on-remove="handleRemoveFile">
            <el-icon class="el-icon--upload">
                <IEpUploadFilled />
            </el-icon>
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon> -->
            <div class="el-upload__text">
                请拖拽文件到此处或 <em>点击此处上传</em>
            </div>
        </ElUpload>
    </ElCard>
</template>

<script></script>
<style></style>