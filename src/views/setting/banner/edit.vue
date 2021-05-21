<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <!-- <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button> -->
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">
                <el-button type="text" icon="el-icon-back" @click="$router.back()"></el-button>
                添加广告图
            </div>
        </el-header>
        <el-main class="center-main" v-loading="loading">
            <el-form ref="form" :model="form" :rules="rules" label-width="140px">
                <el-form-item label="跳转链接" prop="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload ref="upload" :action="baseUrl+'/api/file/upload'" :file-list="fileList" list-type="picture-card" :auto-upload="true" :on-success="onSuccess">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
<script>
import { deepClone } from '@/utils'
import { mapGetters } from 'vuex'
export default {
    components: {  },
    data() {
        const user = this.$store.getters.user
        return {
            loading:false,
            form: {
                url: '',
                status: 1,
                merchantId: user.merchant.id,
                imageId:''
            },
            fileList: [],
            rules:{
                imageId:[
                    {required: true, message:'请上传图片',trigger:'blur'}
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['baseUrl','user'])
    },
    created() {
        if(this.$route.query.id){
            this.getData()
        }
    },
    methods: {
        edit(data) {

        },
        getData(){
            const id = this.$route.query.id;
            this.$api.shop.banner.detail(id).then(res=>{
                this.form = res.result
                res.result.image.url = this.baseUrl + res.result.image.url;
                this.fileList = [res.result.image]
            })
        },
        submit(data) {
            this.refresh();
        },
        refresh() {
            this.$refs.table.refresh();
        },
        handleRemove(file) {
            var fileList = this.$refs.upload.uploadFiles
            for(let i=0;i<fileList.length;i++){
                if(fileList[i].uid==file.uid){
                    fileList.splice(i,1);break;
                }
            }
        },
        handleSetDefault(file){
            this.$refs.upload.uploadFiles.forEach(item=>{
                this.$set(file,'isDefault',false)
            })
            this.$set(file,'isDefault',true)
        },
        onSuccess(response, file, fileList){
            file.id = response.result.id
            if(fileList.length==1){
                this.$set(file,'isDefault',true)
            }
        },
        addSpec(){
            this.form.specs.push({name:'',salePrice:'',marketPrice:'',stock: 999})
        },
        removeSpec(scope){
            this.form.specs.splice(scope.$index,1);
        },
        save(){
            this.$refs.form.validate(valid=>{
                if(!valid){
                    return
                }
                var fileList = this.$refs.upload.uploadFiles
                if(!fileList.length){
                    return this.$message({type:'error',message:'请上传图片',duration:2000});
                }
                var postData = deepClone(this.form);
                postData.imageId=fileList[0].id
                this.loading=true
                this.$api.shop.banner.save(postData).then(()=>{
                    this.$message({type:'success',message:'保存成功',duration:2000});
                    this.$router.back();
                }).finally(()=>{
                    this.loading=false
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.image-default-tag{
    position:absolute;
    padding: 0 30px;
    background: #ff9600;
    color:#fff;
    font-size:12px;
    top: 0;
    left: -30px;
    transform: rotate(-45deg);
}
</style>