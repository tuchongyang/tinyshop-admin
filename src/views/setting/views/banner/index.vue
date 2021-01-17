<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button>
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">广告图管理</div>
        </el-header>
        <el-main class="center-main">
            <div class="table-filter">
                <el-button type="primary" @click="edit()" icon="el-icon-plus" class="float-right">添加</el-button>
            </div>
            <TableMain ref="table" :columnItems="columnItems" :api="listApi" @row-click="onRowClick">
                <template slot="image" slot-scope="scope">
                    <img :src="baseUrl + scope.row.image.url" height="50">
                </template>
                <template slot="status" slot-scope="scope">
                    <span v-if="scope.row.status==1" class="color-green">可用</span>
                    <span v-else class="color-gray">不可用</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click.stop="edit(scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="color-red" @click.stop="remove(scope.row)">删除</el-button>
                </template>
            </TableMain>
        </el-main>
    </el-container>
</template>
<script>
import settingApi from '@/views/setting/api';
import FormDialog from '@/components/FormDialog';
import { deepClone } from '@/utils'
import {mapGetters} from 'vuex'
export default {
    components: { },
    data() {
        return {
            listQuery: {

            },
            listApi:settingApi.shop.banner.list,
            columnItems:[
                {prop:'id',label:'ID'},
                {prop:'url',label:'链接'},
                {prop:'sort',label:'排序'},
                {prop:'image',label:'图片'},
                {prop:'status',label:'状态'},
                {prop:'createdAt',label:'创建时间'},
                {prop:'action',label:'操作',width: 180},
            ],
            currentData: null,
            dVisible: false,
        }
    },
    created() {
        
    },
    computed:{
        ...mapGetters(['baseUrl'])
    },
    methods: {
        edit(data) {
            const query={}
            if(data && data.id){
                query.id = data.id
            }
            this.$router.push({
                path:'banner/edit',query
            })
        },
        submit(data) {
            this.refresh();
        },
        refresh() {
            this.$refs.table.refresh();
        },
        onRowClick(row){
            this.currentData = row;
            this.dVisible = true;
        },
        remove(data){
        	this.$confirm('确认删除吗','提示').then(res=>{
        		settingApi.shop.banner.remove(data.id).then(res=>{
        			this.$message({type:'success',message:'删除成功',duration: 2000});
        			this.refresh();
        		})
        	}).catch(()=>{})
        },
    }
}
</script>
<style lang="scss" scoped>

</style>