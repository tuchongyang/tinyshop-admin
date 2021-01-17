<template>
    <el-upload v-if="limit>1" ref="upload" :action="action" :file-list="fileList" list-type="picture-card" :with-credentials="true" :auto-upload="true" :multiple="limit>1"  :on-success="onSuccess" :on-exceed="onExceed">
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
    <single v-else v-model="model" v-bind="$attrs" :accept="acceptType" :maxSize="getMaxSize()"></single>
</template>
<script>
import single from './single'
export default{
    components:{single},
    props:{
        value: {
            type: String
        },
        limit: 1,
        accept: "",
        maxSize: '500mb'
    },
    data(){
        return {
            fileList: [],
            model: this.value
        }
    },
    watch:{
        value(val){
            if(val && !this.fileList.length){
                this.fileList = [{url: this.$store.getters.baseUrl+val}]
            }
            this.model = val
        },
        model(val){
            this.$emit('input', val);
        }
    },
    computed:{
        action(){
            return this.$store.getters.baseUrl+'/hyperone/file/upload'
        },
        acceptType(){
            const map={
                image: "image/png,image/gif,image/jpg,image/jpeg",
                video: "video/mp4,video/ogg,video/flv,video/avi,video/wmv,video/rmvb,video/mov"
            }
            return this.accept && map[this.accept];
        }
    },
    created(){
        if(this.value){
            this.fileList = [{url: this.$store.getters.baseUrl+this.value}]
        }
    },
    methods:{
        handleRemove(file) {
            var fileList = this.$refs.upload.uploadFiles
            for(let i=0;i<fileList.length;i++){
                if(fileList[i].uid==file.uid){
                    fileList.splice(i,1);break;
                }
            }
            this.model="";
        },
        onSuccess(response, file, fileList){
            file._url = response.result;
            this.model = response.result;
        },
        onExceed(files, fileList){
            console.log('超出数量限制',files, fileList)
        },
        getMaxSize(){
            const limitReg1= /^([\d|\.]+)(mb|m)/i;
            const limitReg2= /^([\d|\.]+)(kb|k)/i;

            let maxSize;

            if (limitReg1.test(this.maxSize)){
                maxSize = this.maxSize.match(limitReg1)[1]* 1024 *1024
            }
            if (limitReg2.test(this.maxSize)){
                maxSize = this.maxSize.match(limitReg2)[1]* 1024
            }
            return maxSize;
        },
    }
}
</script>