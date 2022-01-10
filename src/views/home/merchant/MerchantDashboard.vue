<template>
  <div class="home">
    <el-row class="data-group" :gutter="20">
      <el-col :span="6">
        <BaseInfo type="card" title="商品总数量">
          <b class="num">{{ total.goodnum }}</b>
        </BaseInfo>
      </el-col>
      <el-col :span="6">
        <BaseInfo type="card" title="销售额">
          <b class="num">￥{{ total.amountnum }}</b>
          <div class="desc"></div>
        </BaseInfo>
      </el-col>
      <el-col :span="6">
        <BaseInfo type="card" title="成交订单量">
          <b class="num">{{ total.ordernum }}</b>
          <div class="desc"></div>
        </BaseInfo>
      </el-col>
      <el-col :span="6">
        <BaseInfo type="card" title="进行中订单量">
          <b class="num">{{ total.orderingnum }}</b>
          <div class="desc"></div>
        </BaseInfo>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="margin-bottom">
      <el-col v-for="(item, i) in menus" :key="i" :span="24 / menus.length">
        <div class="menu-item" @click="toPath(item)">
          <el-icon :color="item.color"><component :is="item.icon"></component></el-icon>
          <span class="name">{{ item.label }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <BaseInfo type="card" title="订单金额">
          <div class="visitChart">
            <SCharts :option="optionAmount" v-if="optionAmount" />
          </div>
        </BaseInfo>
      </el-col>
      <el-col :span="8">
        <BaseInfo type="card" title="商品销量排行">
          <div class="rank-list">
            <div class="item" v-for="(item, i) in rankList" :key="i">
              <span class="index">{{ i + 1 }}</span>
              <span class="title">{{ item.name }}</span>
              <span class="num">{{ item.sales }}</span>
            </div>
          </div>
        </BaseInfo>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <BaseInfo type="card" title="订单量">
          <div class="visitChart">
            <SCharts :option="optionNum" v-if="optionNum" />
          </div>
        </BaseInfo>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue"
import { useRouter } from "vue-router"
import { User, Histogram, ShoppingBag, Ticket, Tickets, Message, PriceTag, SetUp } from "@element-plus/icons-vue"
import { useTotalHook } from "./useTotalHook"
const { total } = useTotalHook()
import { useRankHook } from "./useRankHook"
const { rankList } = useRankHook()
import { useTrendHook } from "./useTrendHook"
const { optionAmount, optionNum } = useTrendHook()

const menus = [
  { label: "用户", icon: User, color: "rgb(105, 192, 255)" },
  { label: "分析", icon: Histogram, color: "rgb(149, 222, 100)" },
  { label: "商品", icon: ShoppingBag, color: "rgb(255, 156, 110)", path: "/shop/good" },
  { label: "订单", icon: Tickets, color: "rgb(179, 127, 235)", path: "/order/list" },
  { label: "票据", icon: Ticket, color: "rgb(255, 214, 102)" },
  { label: "消息", icon: Message, color: "rgb(92, 219, 211)" },
  { label: "标签", icon: PriceTag, color: "rgb(255, 133, 192)" },
  { label: "设置", icon: SetUp, color: "rgb(255, 192, 105)", path: "/setting/person" },
]
const instance = getCurrentInstance()
const router = useRouter()
const toPath = (row) => {
  if (row.path) {
    router.push(row.path)
  } else {
    instance.appContext.config.globalProperties.$message.info("暂未开放，敬请期待...")
  }
}
</script>
<style scoped lang="scss">
.data-group {
  .num {
    font-size: 20px;
  }
  .desc {
    font-size: 12px;
  }
}
.menu-item {
  background: #fff;
  text-align: center;
  padding: 15px 0;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.06);
  }
  .el-icon {
    font-size: 24px;
  }
  .name {
    display: block;
  }
}
.visitChart {
  height: 210px;
}
.rank-list {
  .item {
    overflow: hidden;
    line-height: 30px;
    .index {
      float: left;
      width: 20px;
      height: 20px;
      line-height: 20px;
      display: inline-block;
      background: var(--el-bg-color);
      border-radius: 50%;
      text-align: center;
      margin-right: 10px;
      font-size: 12px;
      color: var(--el-text-color-regular);
      margin-top: 5px;
    }
    .name {
      float: left;
    }
    .num {
      float: right;
    }
    &:nth-child(1) {
      .index {
        background: #ffc87a;
        color: #fff;
      }
    }
    &:nth-child(2) {
      .index {
        background: #ffc87a;
        color: #fff;
      }
    }
    &:nth-child(3) {
      .index {
        background: #ffc87a;
        color: #fff;
      }
    }
  }
}
</style>
