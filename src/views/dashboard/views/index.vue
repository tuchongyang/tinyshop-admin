<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button>
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">概览</div>
        </el-header>
        <el-main class="center-main">
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>实时概览</span>
                </div>
                <div class="stat-list">
                    <div class="item">
                        <div class="tit">今日订单数</div>
                        <div class="num">2</div>
                        <div class="des">昨日：0</div>
                    </div>
                    <div class="item">
                        <div class="tit">今日订单金额</div>
                        <div class="num">￥2</div>
                        <div class="des">昨日：0</div>
                    </div>
                    <div class="item">
                        <div class="tit">订单总数</div>
                        <div class="num">2</div>
                        <div class="des">昨日：0</div>
                    </div>
                    <div class="item">
                        <div class="tit">订单总金额</div>
                        <div class="num">￥2</div>
                        <div class="des">昨日：0</div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>常用功能</span>
                </div>
                <div class="function-list">
                    <div class="item" v-for="(item,index) in funList" :key="index">
                        <div class="logo"><i :class="item.icon"></i></div>
                        <div class="det">
                            <div class="name">{{item.name}}</div>
                            <div class="desc">{{item.des}}</div>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>近一月订单统计</span>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>
<script>
import goodApi from '@/views/good/api';
import FormDialog from '@/components/FormDialog';
import { deepClone } from '@/utils'
import {mapGetters} from 'vuex'
export default {
    components: { },
    data() {
        return {
            funList:[
                {name:'发布商品',icon:"el-icon-s-promotion",des:'发布实物商品',path:'/good/list/create'},
                {name:'商品管理',icon:"el-icon-s-goods",des:'管理店铺商品',path:'/good/list'},
                {name:'店铺设置',icon:"el-icon-s-shop",des:'修改店铺信息',path:'/setting/shop'},
                {name:'订单管理',icon:"el-icon-s-order",des:'查询系统订单',path:'/order/list'},
                {name:'广告图',icon:"el-icon-picture",des:'设置店铺首页轮播图',path:'/setting/banner'},
                {name:'分类管理',icon:"el-icon-s-grid",des:'设置商品分类',path:'/good/category'},
            ]
        }
    },
    computed:{
        ...mapGetters(['baseUrl'])
    },
    created() {
        
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.box-card{
    margin-bottom: 20px;
}
.stat-list{
    &:after{
        content:"";display:block;clear: both;
    }
    .item{
        width: 25%;float:left;
        .tit{
            color:#666;
        }
        .num{
            color:#000;font-size:24px;
        }
        .des{
            color:#999;
        }
    }
}
.function-list{
    .item{
        padding:10px;float:left;width:25%;
    }
    &:after{
        content:"";display: block;clear: both;
    }
    .logo{
        width: 50px;height: 50px;line-height:50px;overflow: hidden;float:left;background:#4c7ae8;border-radius:5px;text-align: center;font-size:30px;background: linear-gradient(to left #88aefd,#4c7ae8);color:#fff;
    }
    .det{
        margin-left: 60px;
        .name{
            
        }
        .desc{
            color: #999;
        }
    }
}
</style>