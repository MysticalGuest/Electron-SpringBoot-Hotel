<template>
  <div class="auto-box">
    <div class="main-box">
      <div class="index-tit">
        <p class="title">尊品360宾馆服务平台</p>
        <h1><span text=""></span>{{aName}}正在运行平台！比标准服务更多的，是精益求精的360°服务</h1>
        <p class="subtitle">千锤百炼打造面向顾客的全程服务</p>
      </div>
      <ul class="index-tserver">
        <li class="tserver-list1">
          顾客信息统计
          <p class="animated zoomin">
            <router-link to="front/guest">查询所以已打印发票的房客基本信息</router-link>
            <!-- <a href="GuestInfoForFront">查询所以已打印发票的房客基本信息</a> -->
          </p>
        </li>
        <li class="tserver-list2">
          打印发票
          <p class="animated zoomin">
            <!-- <a href="Bill">点击打印发票</a> -->
            <router-link to="front/print">点击打印发票</router-link>
          </p>
        </li>
        <li class="tserver-list3">
          客房管理
          <p class="animated zoomin">
            <router-link to="front/apartment">查看，更改房间状态</router-link>
          </p>
        </li>
        <li class="tserver-list4">
          账目管理
          <p class="animated zoomin">
            <!-- <a @click="sorry()" href="javascript:void(0)">宾馆每日统计账目</a> -->
            <router-link to="front/account">宾馆每日统计账目</router-link>
          </p>
        </li>
        <li class="tserver-list5">
          账目统计
          <p class="animated zoomin">
            <a @click="sorry()" href="javascript:void(0)">宾馆每日统计账目，宾馆每周、每月、每季度、每年账目详计</a>
            <!-- <router-link to="front/statistics">宾馆每日统计账目，宾馆每周、每月、每季度、每年账目详计</router-link> -->
          </p>
        </li>
        <li class="tserver-list6">
          敬请期待
          <p class="animated zoomin">
            <a href="#"></a>
          </p>
        </li>
        <li class="tserver-list7">
          退出
          <p class="animated zoomin">
            <a @click="logout()" href="javascript:void(0)">回退到尊品360服务平台登录界面</a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '@/assets/css/style-font.css'

export default {
  name: 'home',
  data() {
    return {
      aName: ''
    }
  },
  methods: {
    logout() {
      // 从sessionStorage删除所有保存的数据
      sessionStorage.clear();
      this.$router.push({ path: '/'});
    },
    sorry() {
      this.$confirm('系统仍在完善!先试试其他功能吧!', '提示', {
        confirmButtonText: '确定'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '先试试其他功能吧!'
        });
      });
    }
  },
  created() {
    // 获取token;
    const token = sessionStorage.getItem('token');
    const searchtoken = new URLSearchParams(token);
    console.log('qqqq: ', searchtoken.get('aName'));
    this.aName = searchtoken.get('aName');
  }
}
</script>

<style src="../../assets/css/style-home.css"  scoped></style>
