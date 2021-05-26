<template>
    <div class="">
        <el-card>
            <div slot="header">待处理</div>
            <el-row>
                <el-col>
                    <div class="tit">待付款</div>
                    <div class="num">0</div>
                </el-col>
                <el-col>
                    <div class="tit">待发货</div>
                    <div class="num">0</div>
                </el-col>
                <el-col>
                    <div class="tit">待提货</div>
                    <div class="num">0</div>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <div slot="header">我的商品</div>
            <el-row>
                <el-col>
                    <div class="tit">销售中</div>
                    <div class="num">0</div>
                </el-col>
                <el-col>
                    <div class="tit">待上架</div>
                    <div class="num">0</div>
                </el-col>
                <el-col>
                    <div class="tit">新增商品</div>
                    <div class="num">0</div>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <div slot="header">订单数据</div>
            <el-row>
                <el-col>
                    <div class="tit">总成交订单数</div>
                    <div class="num">0</div>
                </el-col>
                <el-col>
                    <div class="tit">总成交金额</div>
                    <div class="num">0</div>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <div slot="header">用户数据</div>
            <el-row>
                <el-col>
                    <div class="tit">累计下单用户数</div>
                    <div class="num">0</div>
                </el-col>
                <el-col>
                    <div class="tit">累计访问用户数</div>
                    <div class="num">0</div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>