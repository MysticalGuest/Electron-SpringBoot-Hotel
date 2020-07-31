<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/upload"
          class="el-menu-vertical-demo"
          :router="true">
          <el-menu-item index="/upload">
            <i class="el-icon-user-solid"></i>
            <span slot="title">顾客管理</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-printer"></i>
            <span slot="title">打印发票</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-news"></i>
            <span slot="title">客房管理</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-postcard"></i>
            <span slot="title">账目管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-copy-document"></i>
            <span slot="title">账目统计</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">退出</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <UploadArea :visible="visible" />
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import UploadArea from '@/components/UploadArea.vue'

export default {
  name: 'home',
  data() {
    return {
      // 可见性
      visible: true
    }
  },
  components: {
    UploadArea
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (val.path !== '/upload') {
          this.visible = false;
        } else {
          this.visible = true;
        }
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>

<style lang="stylus">
.el-container
  height: 400px;
  border: 1px solid #5B5B5B;
  border-radius: 0px;

.el-aside
  text-align: center;
  line-height: 200px;

.el-menu
  height: 100%;

.el-main
  text-align: center;
</style>
