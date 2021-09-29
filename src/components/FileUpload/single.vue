<template>
    <div class="file-uploader-single">
        <div class="emp" v-if="isOnlyShow && !model">--</div>
        <div tabindex="0" class="el-upload--picture-card" v-else>
            <!--添加-->
            <i class="el-icon-plus file-uploader-icon" v-if="!model"></i>

            <!--下载、删除-->
            <span class="el-upload-list__item-actions" v-if="model && !isOnlyShow">
                <i class="el-icon-download" @click.stop="handleDownload()"></i>
                <i class="el-icon-delete" @click.stop="handleRemove()"></i>
            </span>
            <!--图片文件-->
            <img class="single-img" v-if="model && fileType=='image'" :src="src" :alt="model">

            <video class="single-img" v-if="model && fileType=='video'" :src="src" :alt="model"></video>

            <!--非图片文件-->
            <div class="file-main" v-if="model && fileType=='file'">
                <i class="fa fa-file-zip-o"></i>
                <div class="title" :title="model">
                    {{model}}
                </div>
            </div>
            <input v-if="!isOnlyShow" id="FileUpload"  type="file" :multiple="false" name="file" class="el-upload_input" :accept="accept" @change="handleUploadChange($event)">
            <el-progress v-if="saveMap.loading" type="circle" :percentage="saveMap.percent"></el-progress>
        </div>
    </div>
</template>
<script>
import {deepClone,base64ToBlob,getBase64Image,genNonDuplicateID} from "@/utils";
export default{
    props:['accept','value','maxSize'],
    data(){
        return {
            model: this.value,
            saveMap:{
                loading: false,
                percent: 0 
            }
        }
    },
    watch:{
        value(val){
            this.model = val;
        },
        model(val){
            this.$emit('input', val);
        }
    },
    computed:{
        src(){
            return this.$store.getters.baseUrl + this.model
        },
        fileType(){
            if(!this.model) return 'file'
            const map = {
                image: "png|gif|jpg|bmp|jpeg",
                video: "mp4|ogg|flv|avi|wmv|rmvb|mov"
            }
            for(let i in map){
                const reg = eval("/\.("+map[i]+")$/i")
                if(reg.test(this.model.split('?')[0])){
                    return i;
                }
            }
            
            return "file"
            
        },
        isOnlyShow(){
            return !(typeof(this.$attrs.onlyshow)==='undefined' || this.$attrs.onlyshow===false)
        }
    },
    methods:{
        handleDownload(){
            let url = this.src;
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.target="_blank"
            const title = url.split('?').shift().split('/').pop()
            link.setAttribute('download',title);
            document.body.appendChild(link);
            link.click();
            setTimeout(()=>{
                document.body.removeChild(link);
            })
        },
        handleRemove(){
            this.model=''
        },
        //单个上传操作 原生
        handleUploadChange(event){
            let file = event.target.files[0];
            if(!file) return;
            if (file.size > this.maxSize) {
                return this.$message.error("上传文件大小不能超过" + maxSize +"!");
            }
    
            const formData = new FormData();
            if(this.fileType=='image'){
                getBase64Image(file, 800).then(res=>{
                    file1 = base64ToBlob(res);
                    file1['name'] = file.name;//必须手动加个name
                    console.log(file1);
                    formData.append('file',file1);//file
                    this.upLoadFile(formData,file1);
                }).catch(err=>console.error(err));
            }else{
                formData.append('file',file);//file
                this.upLoadFile(formData,file);
            }
        },
        //上传接口
        upLoadFile(formData,file,fileList){
            const self = this;
            this.saveMap['loading'] = true;
            this.saveMap['percent'] = 0;
            const saveMap = this.saveMap;

            const progressCallback = (currFilePercent)=>{
                currFilePercent = currFilePercent > 99?99:currFilePercent;//最大值99
                self.$forceUpdate();//所以必须有callback
            };

            this.axios({
                method: 'post',
                url: '/system/file/upload?random='+genNonDuplicateID(6),
                headers: {
                'Content-Type': 'multipart/form-data'
                },
                data: formData,
                onUploadProgress: (progressEvent) => {
                    if(saveMap){
                        saveMap['percent'] = (progressEvent.loaded / progressEvent.total * 100 | 0);
                        if(progressCallback && typeof progressCallback == 'function'){
                            progressCallback(saveMap['percent']);
                        }
                    }
                }
            }).then(res=>{
                //成功进度条100%
                this.saveMap['loading'] = false;
                this.saveMap['percent'] = 100;
                progressCallback(100);
                this.model = res.result;

            }).catch(()=>{
                file['loading'] = false;
                this.$forceUpdate();
            });
        },
    }
}
</script>
<style scoped lang="scss">
/*文件上传*/
.file-uploader-single{
    .single-img{
        max-width: 100%;max-height: 100%;
        position: absolute;
        left: 50%;top: 50%;
        transform: translate(-50%,-50%);
    }
    .single-video{

    }
    .el-upload--picture-card{
        position: relative;
        text-align: center;
        .el-upload_input{
            display: block;
            position: absolute;
            width: 100%;height: 100%;
            top: 0;left: 0;cursor: pointer;opacity: 0;
        }

        .file-main{
            text-align: center;
            >i{margin:42px 0 10px}
            line-height: 1;
            .title{
                width: 110px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin: 0 auto;
                text-align: center;
                padding: 10px 0;
            }
        }

        /deep/.el-upload-list__item-actions{
            opacity: 0;
            position: absolute;
            line-height: normal;
            top:4px;right: 6px;
            background-color: transparent;
            z-index: 1;
            i{
                font-size: 18px;
                color: #FF6500;
            }
            .el-icon-download{
                margin-right: 10px;
            }
        }
        .el-progress {
            position: absolute;
            top: 0;left: 0;bottom: 0;right: 0;
            transform: none;
            width: 100%;
            background-color: rgba(0,0,0,.5);
            opacity: 1;
            z-index: 100;
            /deep/.el-progress-circle{
                margin: 0 auto;
                padding-top: 10px;
            }
            /deep/.el-progress__text{
                color: #ffffff;
            }
        }
    }
    &:hover{
        .el-upload--picture-card{
            .el-upload-list__item-actions{
                opacity: 1;
            }
        }
    }
}
</style>