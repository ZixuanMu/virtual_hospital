<template>
  <el-upload
    :limit="1"
    :auto-upload="false"
    :data="suffix"
    :on-change="changesuffix"
    accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp"
  >
    <template #trigger>
      <el-button size="small">选取图片</el-button>
    </template>
  </el-upload>
  <el-button type="primary" @click="submit">确定</el-button>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { reqUpload } from '@/api/mineInformationApi';
import router from '@/router';

const suffix = ref("");
const changesuffix = (UploadFile) => {
  suffix.value = UploadFile;
};
const submit = async () => {
  let formData = new FormData();
   console.log(suffix.value.raw)
    formData.append("file",suffix.value.raw);

    reqUpload(formData).then(res=>{
        if(res.state === 200)
        {
            ElMessage({
                message:'上传成功！',
                type:'success',
                duration:1500
            })
            setTimeout(() => {
              router.push('/mineInformation')
            }, 1000);
           
        }})
    .catch(err => {
      ElMessage({
        message: '服务器出错啦',
        type: 'error',
        duration: 1500
      });
      console.error(err);
    });
  
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
