<template>
  <div class="guest">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-arrow-left" @click="goback" id="back-button">返回首页</el-button>
      </el-col>
      <el-col :span="20">
        <p class="theme">尊品360宾馆服务平台</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" center="true" id="col-search">
        <div class="block">
          <el-date-picker v-model="date" type="date" placeholder="选择日期" style="width: 150px"
            @change="doSearch"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <el-input placeholder="根据入住房间查询:" v-model="room" @input="doSearch"></el-input>
        <el-input placeholder="根据房客姓名查询:" v-model="cName" @input="doSearch"></el-input>
        <el-button type="primary" icon="el-icon-info" id="all-button" v-on:click="showAll">显示全部</el-button>
      </el-col>
      <el-col :span="20" id="col-table">
        <el-table
          :data="guestData.slice((currentPage-1) * pagesize, currentPage * pagesize)"
          border
          style="width: 95%">
          <el-table-column prop="inTime" label="入住日期" align="center"></el-table-column>
          <el-table-column prop="cName" label="姓名" width="80" align="center"></el-table-column>
          <el-table-column prop="cardID" label="身份证号" align="center"></el-table-column>
          <el-table-column prop="roomNum" label="房号" align="center"></el-table-column>
          <el-table-column prop="chargeAndDeposit" label="收款" width="80" align="center"></el-table-column>
          <el-table-column prop="paymentMethod" label="支付方式" width="90" align="center"></el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import api from '@/apis/api.js';
Vue.prototype.$api = api;

export default {
  name: 'guest',
  data() {
    return {
      date: '',
      room: '',
      cName: '',
      guestData: [],
      total: 0,
      pagesize: 10,
      currentPage: 1
    }
  },
  methods: {
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    goback() {
      this.$router.push({ path: '/front'});
    },
    // 搜索函数
    doSearch: function() {
      // const inTime = $('#checkInTime').val();
      // const roomNum = $('#roomNum').val();
      // const cName = $('#cName').val();
      console.log('this.room: ', this.room);
      console.log('this.date: ', this.date);
      const param = new URLSearchParams();
      if (this.date === null) {
        this.date = '';
      }
      param.append('inTime', this.date);
      param.append('roomNum', this.room);
      param.append('cName', this.cName);
      console.log('KKKKKK: ', param);
      this.$api.postData('/commonOperation/SearchCustomerInfo', param)
        .then(res => {
          this.guestData = res.data;
          this.total = res.data.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 显示全部调用函数
    showAll: function() {
      // 将搜索框的输入清空,还原input的状态
      this.date = '';
      this.room = '';
      this.cName = '';
      this.$api.postData('/commonOperation/ShowAllCustomerInfo')
        .then(res => {
          this.guestData = res.data;
          this.total = res.data.length;
        })
        .catch(err => {
          console.log(err);
          this.$confirm('显示失败!', '提示', {
            confirmButtonText: '确定'
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '返回重试!'
            });
          });
        });
    }
  },
  mounted() {
    this.$api.postData('/commonOperation/CustomerInfo')
      .then(res => {
        console.log('sdsddsd: ', res);
        this.guestData = res.data;
        this.total = res.data.length;
      })
      .catch(err => {
        console.log(err);
      });
    this.$nextTick(() => {
    });
    // const remote = window.require('electron').remote;
    // const net = remote.net;
    // const {net} = require('electron').remote;
    // const request = net.r;
    // const request = net.response('http://localhost:8360/commonOperation/CustomerInfo');
    // request.on('response', (response) => {
    //   console.log(`STATUS: ${response.statusCode}`)
    //   console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    //   response.on('data', (chunk) => {
    //     console.log(`BODY: ${chunk}`)
    //     console.log('sdsddsd: ', chunk);
    //     this.guestData = chunk.data;
    //     this.total = chunk.data.length;
    //   })
    //   response.on('end', () => {
    //     console.log('No more data in response.')
    //   })
    // })
    // request.end()
    // 使用
    // axios.get('/wbc/meeting/list').then(resp => {
    //   console.log(resp);
    // }).catch(err => {
    //   console.log(err);
    // });
  }
}
</script>

<style scoped>
.el-input{
  width: 150px;
  margin-bottom: 20px;
}
.theme{
  font-family: HYChaoJiZhanJiaW;
  font-size: 40px;
  color: black;
}
#all-button{
  margin: 0 auto;
}
#back-button{
  margin-right: 30px;
}
.el-pagination{
  padding-top: 15px;
}
</style>

<style>
/* 设置表主体的高度 */
td{
  padding:6px 0 !important;
}
</style>
