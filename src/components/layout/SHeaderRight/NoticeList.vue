<template>
  <div class="notice-list">
    <div class="item">
      <div class="center">
        <div class="title">蒂姆库克回复了你的邮件蒂姆·库克回复了你的邮件</div>
        <div class="time">2021-12-24 10:10:00</div>
      </div>
      <div class="right"><el-tag size="mini">进行中</el-tag></div>
    </div>
    <div class="item">
      <div class="center">
        <div class="title">蒂姆库克回复了你的邮件蒂姆·库克回复了你的邮件</div>
        <div class="time">2021-12-24 10:10:00</div>
      </div>
      <div class="right"><el-tag size="mini" type="danger">即将到期</el-tag></div>
    </div>
    <div class="item">
      <div class="center">
        <div class="title">蒂姆库克回复了你的邮件蒂姆·库克回复了你的邮件</div>
        <div class="time">2021-12-24 10:10:00</div>
      </div>
      <div class="right"><el-tag size="mini" type="info">未开始</el-tag></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.notice-list {
  max-height: 400px;
  overflow: auto;
  .item {
    border-bottom: 1px solid var(--el-border-color-light);
    padding: 10px 20px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.01);
    }
    &:active {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.06) inset;
    }
    .right {
      margin-left: 10px;
    }
    .title {
    }
    .time {
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
