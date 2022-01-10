<template>
  <MessageCenter class="menu-item" />
  <el-dropdown trigger="click" class="menu-item item-avatar" @command="handleCommand">
    <span class="toggle">
      <el-avatar class="avatar" :size="30" :src="user.avatarUrl || circleUrl"></el-avatar><span class="name">{{ user.name || user.email }}</span> <el-icon><arrow-down /></el-icon
    ></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="a">个人中心</el-dropdown-item>
        <el-dropdown-item divided command="b">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import MessageCenter from "./MessageCenter.vue"
const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
const store = useStore()
const user = computed(() => store.state.user.user)

const router = useRouter()

const handleCommand = (command) => {
  switch (command) {
    case "a":
      router.push("/setting/person")
      break
    case "b":
      store.commit("user/logout")
      store.dispatch("tagView/delAllViews")
      router.push("/login")
      break
  }
}
</script>
<style scoped lang="scss">
.menu-item {
  vertical-align: top;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  color: $font-color;
  cursor: pointer;
  &:hover {
    background: var(--el-bg-color);
  }
}

.item-avatar {
  vertical-align: top;
  .avatar {
    vertical-align: middle;
  }
  .toggle {
    cursor: pointer;
    padding: 10px 0;
    display: block;
    span {
      vertical-align: middle;
    }
    .name {
      margin-left: 10px;
    }
    .el-icon {
      vertical-align: middle;
    }
  }
}
</style>
